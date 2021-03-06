using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers;
using API.DTOs;
using API.Entities;
using API.Exensions;
using API.Helpers;
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
        private readonly IERPRepository _erpRepository;
        public ShippingController(UserManager<AppUser> userManager, IShippingRepository shippingRepository,
        IVenderRepository venderRepository, CSVService csvHandler, IMapper mapper, IERPRepository eRPRepository)
        {
            _mapper = mapper;
            _shippingRepository = shippingRepository;
            _userManager = userManager;
            _venderRepository = venderRepository;
            _csvHandler = csvHandler;
            _erpRepository = eRPRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipping>>> GetShippings([FromQuery] ShippingParams shippingParams)
        {
            var shippings = await _shippingRepository.GetShippingsAsync(shippingParams);
            Response.AddPaginationHeader(shippings.CurrentPage, shippings.PageSize, shippings.TotalCount, shippings.TotalPages);

            return Ok(shippings);
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

        [HttpGet("getShippinginArrayFormat/{shipNum}")]
        public async Task<ActionResult<IEnumerable<Shipping>>> ShippingByNum(string shipNum)
        {
            var shipping = await _shippingRepository.GetShippingByNumber(shipNum);

            if (shipping == null)
            {
                return BadRequest("Shipping Number not found.");
            }

            List<Shipping> arrayFormat = new List<Shipping>();
            if (shipping != null)
                arrayFormat.Add(shipping);

            return Ok(arrayFormat);
        }

        // [HttpGet("shippingsByVender/{venderNo}")]
        // public async Task<ActionResult<IEnumerable<Shipping>>> GetShippingsByVender(string venderNo, [FromQuery] PagingParams shippingParams)
        // {
        //     var shippings = await _shippingRepository.GetShippingByVenderAsync(venderNo, shippingParams);
        //     Response.AddPaginationHeader(shippings.CurrentPage, shippings.PageSize, shippings.TotalCount, shippings.TotalPages);

        //     return Ok(shippings);
        // }


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
            var po = await _erpRepository.GetReceivingByPO(shippingDto.PONumber.ToUpper());

            if (po.VendorNo != shippingDto.VenderNo) return BadRequest("Invalid PO or Vender Number.");

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
            var shipMethod = await _venderRepository.GetShippingMethodbyName(shippingDto.LogisticName);

            shipping.ArrivalDate = shippingDto.ArrivalDate;
            shipping.InvoiceNumber = shippingDto.InvoiceNumber;
            shipping.ShippingMethod = shipMethod;
            shipping.User = user;
            shipping.Vender = vender;
            shipping.PONumber = shippingDto.PONumber;

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