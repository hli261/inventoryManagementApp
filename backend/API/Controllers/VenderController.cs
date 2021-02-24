using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VenderController : BaseApiController
    {
        private readonly CSVService _csvHandler;
        private readonly IVenderRepository _venderRepository;
        public VenderController(IVenderRepository venderRepository, CSVService csvHandler)
        {
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