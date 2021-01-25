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
    public class BinItemController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IBinItemRepository _binItemRepository;

        public BinItemController(IMapper mapper, IBinItemRepository binItemRepository)
        {
            _mapper = mapper;
            _binItemRepository = binItemRepository;
        }

        [HttpPost("CreateBinItem")]
        public async Task<ActionResult<BinItemDto>> CreateBinItem(CreateBinItemDto createBinItemDto)
        {
            var binItem = new BinItem{
                Quantity = createBinItemDto.Quantity,
                Bin = createBinItemDto.Bin,
                Item = createBinItemDto.Item 
            };

            _binItemRepository.AddBinItem(binItem);

            if(await _binItemRepository.SaveAllAsync())
            
                return Ok(_mapper.Map<BinItemDto>(binItem));

            return BadRequest("Failed to add item.");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinItemDto>>> GetBinItems()
        {
            var binItems = await _binItemRepository.GetBinItems();

            return Ok(_mapper.Map<IEnumerable<BinItemDto>>(binItems));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BinItemDto>> GetBinItemById(int id)
        {
            var binItem = await _binItemRepository.GetBinItemById(id);

            return Ok(_mapper.Map<BinItemDto>(binItem));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBinItem(int id)
        {

            var binItem = await _binItemRepository.GetBinItemById(id);

            if(binItem != null){
                _binItemRepository.DeleteBinItem(binItem);
            }

            if (await _binItemRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete item.");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBinItem(BinItemDto binItemDto)
        {
            var binItem = await _binItemRepository.GetBinItemById(binItemDto.Id);

            _mapper.Map(binItemDto, binItem);

            _binItemRepository.UpdateBinItem(binItem);

            if(await _binItemRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update item.");
        }
    }
}