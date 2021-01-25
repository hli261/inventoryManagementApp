using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[Authorize]
    public class WarehouseLocationController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IWarehouseLocationRepository _warehouseLocationRepository;

        public WarehouseLocationController(IMapper mapper, IWarehouseLocationRepository warehouseLocationRepository)
        {
            _mapper = mapper;
            _warehouseLocationRepository = warehouseLocationRepository;
        }

        [HttpPost("CreateWarehouseLocation")]
        public async Task<ActionResult<WarehouseLocationDto>> CreateWarehouseLocation(CreateWarehouseLocationDto createWarehouseLocationDto)
        {
            var wl = new WarehouseLocation{
                LocationName = createWarehouseLocationDto.LocationName
            };

            _warehouseLocationRepository.AddWarehouseLocation(wl);

            if(await _warehouseLocationRepository.SaveAllAsync())
            
                return Ok(_mapper.Map<WarehouseLocationDto>(wl));

            return BadRequest("Failed to add warehouse location.");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WarehouseLocationDto>>> GetBinTypes()
        {
            var warehouseLocations = await _warehouseLocationRepository.GetWarehouseLocations();

            return Ok(_mapper.Map<IEnumerable<WarehouseLocationDto>>(warehouseLocations));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseLocationDto>> GetWarehouseLocationById(int id)
        {
            var wl = await _warehouseLocationRepository.GetWarehouseLocationById(id);

            return Ok(_mapper.Map<WarehouseLocationDto>(wl));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteWarehouseLocation(int id)
        {

            var wl = await _warehouseLocationRepository.GetWarehouseLocationById(id);

            if(wl != null){
                _warehouseLocationRepository.DeleteWarehouseLocation(wl);
            }

            if (await _warehouseLocationRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete warehouse location.");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateWarehouseLocation(WarehouseLocationDto warehouseLocationDto)
        {
            var wl = await _warehouseLocationRepository.GetWarehouseLocationById(warehouseLocationDto.Id);

            _mapper.Map(warehouseLocationDto, wl);

            _warehouseLocationRepository.UpdateWarehouseLocation(wl);

            if(await _warehouseLocationRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update bin type.");
        }
    }
}