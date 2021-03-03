using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VenderController : BaseApiController
    {
        private readonly CSVService _csvHandler;
        private readonly IVenderRepository _venderRepository;
        private readonly IMapper _mapper;
        public VenderController(IVenderRepository venderRepository, CSVService csvHandler, IMapper mapper)
        {
            _mapper = mapper;
            _venderRepository = venderRepository;
            _csvHandler = csvHandler;
        }

        [HttpGet("venderCSVfile")]
        public ActionResult ImportVenderCsvFile()
        {
            if (_csvHandler.ReadVenderCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");
        }

        [HttpGet("shippingMethodsCSVfile")]
        public ActionResult ImportShippingMethodsCsvFile()
        {
            if (_csvHandler.ReadShippingMethodsCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");
        }

        [HttpGet("shippingMethods")]
        public async Task<ActionResult<IEnumerable<ShippingMethod>>> GetShippingMethods()
        {
            var shippingMethods = await _venderRepository.GetShippingMethods();

            return Ok(shippingMethods);
        }

        [HttpPost("createShippingMethod")]
        public async Task<ActionResult<IEnumerable<ShippingMethod>>> CreateShippingMethod(ShippingMethodDto method)
        {
            if (await _venderRepository.ShippingMethodExist(method.LogisticName) == true)
                return BadRequest("Shipping Method Already Exist");

            var shippingMethod = _mapper.Map<ShippingMethod>(method);

            _venderRepository.CreateShippingMethod(shippingMethod);

            if (await _venderRepository.SaveAllAsync())
                return Ok(shippingMethod);

            return BadRequest("Failed to add shipping method.");
        }

        [HttpDelete("deleteShippingMethod/{name}")]
        public async Task<ActionResult> DeleteShipping(string name)
        {
            var shipping = await _venderRepository.GetShippingMethodbyName(name.ToUpper());

            if (shipping != null)
            {
                _venderRepository.deleteShippingMethod(shipping);
            }

            if (await _venderRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Failed to delete shipping.");
        }

        [HttpGet("venderExist/{venderNo}")]
        public async Task<ActionResult<Vender>> GetVenderExist(string venderNo)
        {
            var venderExist = await _venderRepository.GetVenderByNumber(venderNo);
            if (venderExist != null)
            {
                return Ok(venderExist);
            }
            else
            {
                return BadRequest("Vender does not exist.");
            }
        }
    }
}