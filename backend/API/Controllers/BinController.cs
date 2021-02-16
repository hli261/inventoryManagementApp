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
using API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Services;
using API.Exensions;
using API.Data;
using Microsoft.EntityFrameworkCore;
using System;

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
        private readonly CSVService _csvHandler;
        private readonly DataContext _context;

        public BinController(IMapper mapper, IBinRepository binRepository, IUserRepository userRepository,
            IBinTypeRepository binTypeRepository, IWarehouseLocationRepository warehouseLocationRepository,
             CSVService csvHandler, DataContext context)
        {
            _csvHandler = csvHandler;
            _context = context;
            _mapper = mapper;
            _binRepository = binRepository;
            _userRepository = userRepository;
            _binTypeRepository = binTypeRepository;
            _warehouseLocationRepository = warehouseLocationRepository;
        }

        [HttpGet("bincsvfile")]
        public ActionResult ImportBinCsvFile()
        {
            if (_csvHandler.ReadBinCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");

        }

        [HttpPost("createBin")]
        public async Task<ActionResult<BinDto>> CreateBin(CreateBinDto createBinDto)
        {
            var creator = User.GetUserName();
            var binType = await _binTypeRepository.GetBinTypeByName(createBinDto.TypeName);
            var warehouserLocation = await _warehouseLocationRepository.GetWarehouseLocationByName(createBinDto.LocationName);

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

        [HttpGet("byBinParams")]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsByParams([FromQuery]BinParams binParams)
        {
            var bins = await _binRepository.GetBinsByParams(binParams);

            Response.AddPaginationHeader(bins.CurrentPage, bins.PageSize, bins.TotalCount, bins.TotalPages);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBins()
        {
           
            var bins = await _binRepository.GetBinsByTypeId(2);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        //////////////////////PAGING////////////////////////
        // [HttpGet("byBinParams")]
        // public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsWithPaging([FromQuery] PagingParams binParams)
        // {
        //     var bins = await _binRepository.GetBinsAsync(binParams);

        //     Response.AddPaginationHeader(bins.CurrentPage, bins.PageSize, bins.TotalCount, bins.TotalPages);

        //     return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        // }

        [HttpGet("byTypeId")]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsByTypeId(int id)
        {
           
            var bins = await _binRepository.GetBinsByTypeId(id);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        [HttpGet("byTypeName")]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsByType(string name)
        {
            var bins = await _binRepository.GetBinsByType(name);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        [HttpGet("byWarehouseName")]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsByWarehouseName(string name)
        {
            var bins = await _binRepository.GetBinsByWarehouse(name);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        [HttpGet("byWarehouseId")]
        public async Task<ActionResult<IEnumerable<BinDto>>> GetBinsByWarehouseId(int id)
        {
            var bins = await _binRepository.GetBinsByWarehouseLocationId(id);

            return Ok(_mapper.Map<IEnumerable<BinDto>>(bins));
        }

        [HttpGet("byBinCode")]
        public async Task<ActionResult<BinDto>> GetBinByCode(string code)
        {
            var bin = await _binRepository.GetBinByCode(code);
            if(bin == null){
                return BadRequest("Bin Code cannot found");
            }

            return Ok(_mapper.Map<BinDto>(bin));
        }

        [HttpPut("byBinCode")]
        public async Task<ActionResult> UpdateBin(UpdateBinDto updateBinDto)
        {
            var bin = await _binRepository.GetBinByCode(updateBinDto.BinCode);
            var binType = await _binTypeRepository.GetBinTypeByName(updateBinDto.BinTypeName);
            var warehouseLocation = await _warehouseLocationRepository.GetWarehouseLocationByName(updateBinDto.WarehouseLocationName);

            if (bin == null)
            {
                return BadRequest("Bin Code cannot found");
            }

            bin.BinType = binType;
            bin.WarehouseLocation = warehouseLocation;
            bin.BinTypeId = binType.Id;
            bin.WarehouseLocationId = warehouseLocation.Id;
            
            // switch (bin.BinType.TypeName.ToLower())
            // {
            //     case "primary":
            //         bin.BinTypeId = 1;
            //         bin.BinType.Id = 1;
            //         break;
            //     case "overstock":
            //         bin.BinTypeId = 2;
            //         bin.BinType.Id = 2;
            //         break;
            //     case "operation":
            //         bin.BinTypeId = 3;
            //         bin.BinType.Id = 3;
            //         break;
            //     default:
            //         Console.WriteLine("cannot find the type");
            //         break;
            // }

            // switch (bin.WarehouseLocation.LocationName.ToLower())
            // {
            //     case "toronto":
            //         bin.WarehouseLocationId = 1;
            //         bin.WarehouseLocation.Id = 1;
            //         break;
            //     case "usa":
            //         bin.WarehouseLocationId = 2;
            //         bin.WarehouseLocation.Id = 2;
            //         break;
            //     case "vancouver":
            //         bin.WarehouseLocationId = 3;
            //         bin.WarehouseLocation.Id = 3;
            //         break;
            //     case "qubec":
            //         bin.WarehouseLocationId = 4;
            //         bin.WarehouseLocation.Id = 4;
            //         break;
            //     case "halifax":
            //         bin.WarehouseLocationId = 5;
            //         bin.WarehouseLocation.Id = 5;
            //         break;
            //     case "calgary":
            //         bin.WarehouseLocationId = 6;
            //         bin.WarehouseLocation.Id = 6;
            //         break;
            //     default:
            //         Console.WriteLine("cannot find the location");
            //         break;
            // }

            _mapper.Map(updateBinDto, bin);

            _binRepository.UpdateBinAsync(bin);


            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok(_mapper.Map<BinDto>(bin));
            }
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