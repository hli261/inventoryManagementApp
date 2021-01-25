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
    public class ItemController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IItemRepository _itemRepository;

        public ItemController(IMapper mapper, IItemRepository itemRepository)
        {
            _mapper = mapper;
            _itemRepository = itemRepository;
        }

        [HttpPost("CreateItem")]
        public async Task<ActionResult<ItemDto>> CreateBinType(CreateItemDto createItemDto)
        {
            var item = new Item{
                ItemName = createItemDto.ItemName,
                ItemNumber = createItemDto.ItemNumber,
                Description = createItemDto.Description
            };

            _itemRepository.AddItem(item);

            if(await _itemRepository.SaveAllAsync())
            
                return Ok(_mapper.Map<ItemDto>(item));

            return BadRequest("Failed to add item.");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems()
        {
            var items = await _itemRepository.GetItems();

            return Ok(_mapper.Map<IEnumerable<ItemDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItemById(int id )
        {
            var item = await _itemRepository.GetItemById(id);

            return Ok(_mapper.Map<ItemDto>(item));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {

            var item = await _itemRepository.GetItemById(id);

            if(item != null){
                _itemRepository.DeleteItem(item);
            }

            if (await _itemRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete item.");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateItem(ItemDto itemDto)
        {
            var item = await _itemRepository.GetItemById(itemDto.Id);

            _mapper.Map(itemDto, item);

            _itemRepository.UpdateItem(item);

            if(await _itemRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update item.");
        }
    }
}