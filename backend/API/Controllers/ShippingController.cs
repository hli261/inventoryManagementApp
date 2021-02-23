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

            _shippingRepository.AddShippingAsync(shipping);

            if (await _shippingRepository.SaveAllAsync())

                return Ok(shipping);

            return BadRequest("Failed to add shipping.");
        }


    }
}