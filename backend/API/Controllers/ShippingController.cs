using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ShippingController : BaseApiController
    {
        private readonly IShippingRepository _shippingRepository;
        private readonly IVenderRepository _venderRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly CSVService _csvHandler;
        public ShippingController(UserManager<AppUser> userManager, IShippingRepository shippingRepository, IVenderRepository venderRepository, CSVService csvHandler, IMapper mapper)
        {
            _mapper = mapper;
            _shippingRepository = shippingRepository;
            _userManager = userManager;
            _venderRepository = venderRepository;
            _csvHandler = csvHandler;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipping>>> GetShippings()
        {
            var shippings = await _shippingRepository.GetShippingsAsync();

            return Ok(shippings);
        }


        [HttpGet("shippingCSVfile")]
        public ActionResult ImportShippingCsvFile()
        {
            if (_csvHandler.ReadShippingCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");
        }


        [HttpGet("shippingLotCSVfile")]
        public ActionResult ImportShippingLotCsvFile()
        {
            if (_csvHandler.ReadShippingLotCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");
        }

        [HttpPost("createShipping")]
        public async Task<ActionResult<ShippingDto>> CreateShipping(ShippingDto shippingDto)
        {
            var shipping = _mapper.Map<Shipping>(shippingDto);

            shipping.Vender = await _venderRepository.GetVenderByNumber(shippingDto.VenderNo.ToUpper());
            shipping.User = await _userManager.FindByEmailAsync(shippingDto.UserEmail);
            shipping.ShippingNumber = "SN" + _shippingRepository.LotCountAsync().ToString().PadLeft(7, '0');
            shipping.ShippingMethod = await _venderRepository.GetShippingMethodbyName(shippingDto.LogisticName.ToUpper());

            var lot = new ShippingLot
            {
                LotNumber = "LOT" + shippingDto.ArrivalDate.ToString("MMddyyyy") + shipping.ShippingNumber,

                CreateTime = shippingDto.ArrivalDate
            };
            _shippingRepository.CreateShippingLot(lot);

            shipping.ShippingLot = lot;

            _shippingRepository.AddShippingAsync(shipping);

            if (await _shippingRepository.SaveAllAsync())

                return Ok(shipping);

            return BadRequest("Failed to add shipping.");
        }

        [HttpGet("getShipping/{shipNum}")]
        public async Task<ActionResult> ShippingByNumber(string shipNum)
        {
            var shipping = await _shippingRepository.GetShippingByNumber(shipNum);

            if (shipping == null)
            {
                return BadRequest("Shipping Number not found.");
            }

            return Ok(shipping);
        }

        [HttpPut("update/{shipNum}")]
        public async Task<ActionResult> UpdateShipping(UpdateShippngDto shippingDto, string shipNum)
        {
            var shipping = await _shippingRepository.GetShippingByNumber(shipNum);

            if (shipping == null)
            {
                return BadRequest("Shipping Number not found.");
            }
            var user = await _userManager.FindByEmailAsync(shippingDto.UserEmail);
            var vender = await _venderRepository.GetVenderByNumber(shippingDto.VenderNo);
            var shipMethod = await _venderRepository.GetShippingMethodbyName(shippingDto.ShippingMethod);

            shipping.ArrivalDate = shippingDto.ArrivalDate;
            shipping.InvoiceNumber = shippingDto.InvoiceNumber;
            shipping.ShippingMethod = shipMethod;
            shipping.User = user;
            shipping.Vender = vender;

            _shippingRepository.UpdateShipping(shipping);


            if (await _shippingRepository.SaveAllAsync())
            {
                return Ok(shipping);
            }
            return BadRequest("Failed to update shipping.");
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteShipping(int id)
        {
            var shipping = await _shippingRepository.GetShippingById(id);

            if (shipping != null)
            {
                _shippingRepository.DeleteShipping(shipping);
            }

            if (await _shippingRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Failed to delete shipping.");
        }

        [HttpGet("lotbynumber/{number}")]
        public async Task<ActionResult<ShippingLot>> GetLotByNumber(string number)
        {
            var lot = await _shippingRepository.GetShippingLotByNumber(number);

            return Ok(_mapper.Map<ShippingLot>(lot));
        }
    }
}