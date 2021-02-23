using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ERPController : BaseApiController
    {
        // private readonly IERPRepository _erpRepository;
        // private readonly IMapper _mapper;
        // private readonly CSVService _csvHandler;
        // public ERPController(IERPRepository erpRepository, CSVService csvHandler, IMapper mapper)
        // {
        //     _mapper = mapper;
        //     _erpRepository = erpRepository;
        //     _csvHandler = csvHandler;
        // }
        private readonly CSVService _csvHandler;
        public ERPController(CSVService csvHandler)
        {
            _csvHandler = csvHandler;
        }

        [HttpGet("POitemCSVfile")]
        public ActionResult ImportPOitemCsvFile()
        {
            if (_csvHandler.ReadPOitemCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");
        }

        [HttpGet("POheaderCSVfile")]
        public ActionResult ImportPOheaderCsvFile()
        {
            if (_csvHandler.ReadPOheaderCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");
        }

    }
}