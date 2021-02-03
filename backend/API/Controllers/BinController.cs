using System.Runtime.InteropServices.ComTypes;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Helpers;
using API.Exensions;

namespace API.Controllers
{
    //[Authorize]
    public class BinController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        private readonly IBinRepository _binRepository;

        private readonly IBinTypeRepository _binTypeRepository;

        private readonly IWarehouseLocationRepository _warehouseLocationRepository;

        public BinController(IMapper mapper, IBinRepository binRepository, IUserRepository userRepository,
            IBinTypeRepository binTypeRepository, IWarehouseLocationRepository warehouseLocationRepository)
        {
            _mapper = mapper;
            _binRepository = binRepository;
            _userRepository = userRepository;
            _binTypeRepository = binTypeRepository;
            _warehouseLocationRepository = warehouseLocationRepository;
        }

        [HttpPost("createBin")]
        public async Task<ActionResult<BinDto>> CreateBin(CreateBinDto createBinDto)
        {
            var creator = User.GetUserName();
            var binType = await _binTypeRepository.GetBinTypeById(createBinDto.BinTypeId);
            var warehouserLocation = await _warehouseLocationRepository.GetWarehouseLocationById(createBinDto.WarehouseLocationId);

            var bin = new Bin
            {
                Creator = creator,
                BinReference = createBinDto.BinReference,
                BinCode = createBinDto.BinCode,
                BinType = binType,
                WarehouseLocation = warehouserLocation
            };

            _binRepository.AddBin(bin);

            if (await _binRepository.SaveAllAsync())

                return Ok(_mapper.Map<BinDto>(bin));

            return BadRequest("Failed to add bin.");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBins()
        {
            var bins = await _binRepository.GetBins();

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        //paging
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<BinDto>>> GetUsersWithPaging([FromQuery] PagingParams binParams)
        // {
        //     var bins = await _binRepository.GetBinsAsync(binParams);

        //     Response.AddPaginationHeader(bins.CurrentPage, bins.PageSize, bins.TotalCount, bins.TotalPages);

        //     return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        // }

        [HttpGet("byType")]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsByType(string type)
        {
            var bins = await _binRepository.GetBinsByType(type);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        [HttpGet("byWarehouse")]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsByWarehouse(string warehouse)
        {
            var bins = await _binRepository.GetBinsByWarehouse(warehouse);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        [HttpGet("byBinCode")]
        public async Task<ActionResult<BinDto>> GetBinByCode(string code)
        {
            var bin = await _binRepository.GetBinByCode(code);

            return Ok(_mapper.Map<BinDto>(bin));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBin(UpdateBinDto updateBinDto)
        {
            var bin = await _binRepository.GetBinByCode(updateBinDto.BinCode);

            _mapper.Map(updateBinDto, bin);

            _binRepository.UpdateBin(bin);

            if (await _binRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update bin.");
        }


        [HttpDelete("{binCode}")]
        public async Task<ActionResult> DeleteBin(string code)
        {

            var bin = await _binRepository.GetBinByCode(code);



            if (bin != null)
            {
                _binRepository.DeleteBin(bin);
            }

            if (await _binRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete bin.");
        }
    }
}