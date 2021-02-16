using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[Authorize]
    public class BinTypeController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IBinTypeRepository _binTypeRepository;
        private readonly CSVService _csvHandler;

        public BinTypeController(IMapper mapper, IBinTypeRepository binTypeRepository, CSVService csvHandler)
        {
            _csvHandler = csvHandler;
            _mapper = mapper;
            _binTypeRepository = binTypeRepository;
        }

        [HttpGet("bintypecsvfile")]
        public ActionResult ImportBinTypeCsvFile()
        {
            if (_csvHandler.ReadBinTypeCsvFile() != null)
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");

        }

        [HttpPost("CreateBinType")]
        public async Task<ActionResult<BinTypeDto>> CreateBinType(CreateBinTypeDto createBinTypeDto)
        {
            var binType = new BinType
            {
                TypeName = createBinTypeDto.TypeName
            };

            _binTypeRepository.AddBinType(binType);

            if (await _binTypeRepository.SaveAllAsync())

                return Ok(_mapper.Map<BinTypeDto>(binType));

            return BadRequest("Failed to add bin type.");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinTypeDto>>> GetBinTypes()
        {
            var binTypes = await _binTypeRepository.GetBinTypes();

            return Ok(_mapper.Map<IEnumerable<BinTypeDto>>(binTypes));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BinTypeDto>> GetBinTypeById(int id)
        {
            var binType = await _binTypeRepository.GetBinTypeById(id);

            return Ok(_mapper.Map<BinTypeDto>(binType));
        }
        
        [HttpGet("{TypeName}")]
        public async Task<ActionResult<BinTypeDto>> GetBinTypeByName(string name)
        {
            var binType = await _binTypeRepository.GetBinTypeByName(name);

            return Ok(_mapper.Map<BinTypeDto>(binType));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBinType(int id)
        {

            var binType = await _binTypeRepository.GetBinTypeById(id);

            if (binType != null)
            {
                _binTypeRepository.DeleteBinType(binType);
            }

            if (await _binTypeRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete bin type.");
        }

        // [HttpPut]
        // public async Task<ActionResult> UpdateBinType(BinTypeDto binTypeDto)
        // {
        //     var binType = await _binTypeRepository.GetBinTypeById(binTypeDto.Id);

        //     _mapper.Map(binTypeDto, binType);

        //     _binTypeRepository.UpdateBinType(binType);

        //     if (await _binTypeRepository.SaveAllAsync()) return NoContent();

        //     return BadRequest("Failed to update bin type.");
        // }
    }
}