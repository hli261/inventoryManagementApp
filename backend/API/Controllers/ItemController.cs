using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Exensions;
using API.Helpers;
using API.Interfaces;
using API.Services;
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
        private readonly CSVService _csvHandler;

        public ItemController(IMapper mapper, IItemRepository itemRepository, CSVService csvHandler)
        {
            _csvHandler = csvHandler;
            _mapper = mapper;
            _itemRepository = itemRepository;
        }

        [HttpGet("itemcsvfile")]
        public ActionResult ImportItemCsvFile()
        {
            if(_csvHandler.ReadItemCsvFile() != null){
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");

        }

        [HttpPost("CreateItem")]
        public async Task<ActionResult<ItemDto>> CreateBinType(CreateItemDto createItemDto)
        {
            var item = new Item
            {
                ItemNumber = createItemDto.ItemNumber,
                ItemDescription = createItemDto.ItemDescription,
                ItemPrice = createItemDto.ItemPrice,
                UpcCode = createItemDto.UpcCode,
                ItemStatus = createItemDto.ItemStatus,
                UnitOfMeasure = createItemDto.UnitOfMeasure,
                UomUnit = createItemDto.UomUnit,
                FDA = createItemDto.FDA
            };

            _itemRepository.AddItem(item);

            if (await _itemRepository.SaveAllAsync())

                return Ok(_mapper.Map<ItemDto>(item));

            return BadRequest("Failed to add item.");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems()
        {
            var items = await _itemRepository.GetItems();

            return Ok(_mapper.Map<IEnumerable<ItemDto>>(items));
        }

        //////////////////////PAGING////////////////////////
        // [HttpGet("byParams")]
        // public async Task<ActionResult<IEnumerable<ItemDto>>> GetUsersWithPaging([FromQuery] PagingParams itemParams)
        // {
        //     var items = await _itemRepository.GetItemsAsync(itemParams);

        //     Response.AddPaginationHeader(items.CurrentPage, items.PageSize, items.TotalCount, items.TotalPages);

        //     return Ok(_mapper.Map<IEnumerable<ItemDto>>(items));
        // }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItemById(int id)
        {
            var item = await _itemRepository.GetItemById(id);

            return Ok(_mapper.Map<ItemDto>(item));
        }

        [HttpGet("{ItemNumber}")]
        public async Task<ActionResult<ItemDto>> GetItemByNumber(string number)
        {
            var item = await _itemRepository.GetItemByNumber(number);

            return Ok(_mapper.Map<ItemDto>(item));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {

            var item = await _itemRepository.GetItemById(id);

            if (item != null)
            {
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

            if (await _itemRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update item.");
        }
    }
}