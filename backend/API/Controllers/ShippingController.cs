using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers;
using API.DTOs;
using API.Entities;
using API.Interfaces;
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
        public ShippingController(UserManager<AppUser> userManager, IShippingRepository shippingRepository, IVenderRepository venderRepository, IMapper mapper)
        {
            _mapper = mapper;
            _shippingRepository = shippingRepository;
            _userManager = userManager;
            _venderRepository = venderRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Shipping>>> GetShippings()
        {
            var shippings = await _shippingRepository.GetShippingsAsync();

            return Ok(shippings);
        }

        [HttpPost("createShipping")]
        public async Task<ActionResult<ShippingDto>> CreateShipping(ShippingDto shippingDto)
        {
            var shipping = _mapper.Map<Shipping>(shippingDto);

            shipping.Vender = await _venderRepository.GetVenderByNumber(shippingDto.VenderNo.ToUpper());
            shipping.User = await _userManager.FindByEmailAsync(shippingDto.UserEmail);

            var lot = new ShippingLot
            {
                LotDetail = "Item from "
                + shipping.Vender.VenderName
                + " received by "
                + shipping.User.FirstName
                + " "
                + shipping.User.LastName,

                CreateTime = shippingDto.ArrivalDate
            };
            _shippingRepository.CreateShippingLot(lot);

            shipping.ShippingLot = lot;

            _shippingRepository.AddShippingAsync(shipping);

            if (await _shippingRepository.SaveAllAsync())

                return Ok(shipping);

            return BadRequest("Failed to add shipping.");
        }

        [HttpPut("update")]
        public async Task<ActionResult> UpdateShipping(UpdateShippngDto shippingDto)
        {
            var shipping = await _shippingRepository.GetShippingById(shippingDto.Id);

            if (shipping == null)
            {
                return BadRequest("Shipping ID not found.");
            }
            var user = await _userManager.FindByEmailAsync(shippingDto.UserEmail);
            var vender = await _venderRepository.GetVenderByNumber(shippingDto.VenderNo);

            shipping.ArrivalDate = shippingDto.ArrivalDate;
            shipping.InvoiceNumber = shippingDto.InvoiceNumber;
            shipping.ShippingMethod = shippingDto.ShippingMethod;
            shipping.User = user;
            shipping.Vender = vender;
            shipping.ShippingLot.LotDetail += "\nModified by " + user.FirstName + " " + user.LastName + " on " + DateTime.UtcNow;

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

            var lot = await _shippingRepository.GetShippingLotById(shipping.ShippingLot.Id);

            lot.LotDetail += "\nDeleted by " + shipping.User.FirstName + " " + shipping.User.LastName + " on " + DateTime.UtcNow;

            shipping.ShippingLot = lot;

            if (await _shippingRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Failed to delete shipping.");
        }


    }
}