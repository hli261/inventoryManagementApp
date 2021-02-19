using Microsoft.CSharp.RuntimeBinder;
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
    public class BinItemController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IBinItemRepository _binItemRepository;
        private readonly CSVService _csvHandler;
        private readonly IItemRepository _itemRepository;
        private readonly IBinRepository _binRepository;

        public BinItemController(IMapper mapper, IBinItemRepository binItemRepository, CSVService csvHandler,
            IBinRepository binRepository, IItemRepository itemRepository)
        {
            _csvHandler = csvHandler;
            _itemRepository = itemRepository;
            _binRepository = binRepository;
            _mapper = mapper;
            _binItemRepository = binItemRepository;
        }

        [HttpGet("binitemcsvfile")]
        public ActionResult ImportBinItemCsvFile()
        {
            if (_csvHandler.ReadBinItemCsvFile() == "Completed")
            {
                return Ok("Proces completed");
            }
            return BadRequest("Cannot reading file");

        }

        [HttpPost("CreateBinItem")]
        public async Task<ActionResult<BinItemDto>> CreateBinItem(CreateBinItemDto createBinItemDto)
        {
            var bin = await _binRepository.GetBinByCode(createBinItemDto.BinCode);
            var item = await _itemRepository.GetItemByNumber(createBinItemDto.ItemNumber);

            var binItem = new BinItem
            {
                Quantity = createBinItemDto.Quantity,
                Bin = bin,
                Item = item
            };

            _binItemRepository.AddBinItem(binItem);

            if (await _binItemRepository.SaveAllAsync())

                return Ok(_mapper.Map<BinItemDto>(binItem));

            return BadRequest("Failed to add item.");
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<BinItemDto>>> GetBinItems()
        {
            var binItems = await _binItemRepository.GetBinItems();

            return Ok(_mapper.Map<IEnumerable<BinItemDto>>(binItems));
        }

        ////////////////////PAGING////////////////////////
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BinItemDto>>> GetBinItemsWithPaging([FromQuery] PagingParams binItemParams)
        {
            var binItems = await _binItemRepository.GetBinItemsAsync(binItemParams);

            // foreach(var binItem in binItems){
            //     binItem.BinCode = binItem.Bin.BinCode;
            //     binItem.ItemNumber = binItem.Item.ItemNumber;
            // }

            Response.AddPaginationHeader(binItems.CurrentPage, binItems.PageSize, binItems.TotalCount, binItems.TotalPages);

            return Ok(_mapper.Map<IEnumerable<BinItemDto>>(binItems));
        }

        [HttpGet("byBinCode/{code}")]
         public async Task<ActionResult<IEnumerable<BinItemQueryDto>>> GetBinItemsByBinCode(string code)
        {
            var bin = await _binRepository.GetBinByCode(code);
            
            if (bin == null){
                return BadRequest("Bin Code cannot be found");
            }

            var binItems = await _binItemRepository.GetBinItemsByBinCode(code);            

            return Ok(binItems);
        }

        [HttpGet("byNumber/{number}")]
         public async Task<ActionResult<IEnumerable<BinItemQueryDto>>> GetBinItemsByItemNumber(string number)
        {
            var item = await _itemRepository.GetItemByNumber(number);

            if(item == null){
                return BadRequest("Item cannot be found");
            }

            var binItems = await _binItemRepository.GetBinItemsByItemNumber(number);            

            return Ok(binItems);
        }

        [HttpGet("byId/{Id}")]
        public async Task<ActionResult<BinItemDto>> GetBinItemById(int id)
        {
            var binItem = await _binItemRepository.GetBinItemById(id);

            return Ok(_mapper.Map<BinItemDto>(binItem));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBinItem(int id)
        {

            var binItem = await _binItemRepository.GetBinItemById(id);

            if (binItem != null)
            {
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

            _binItemRepository.UpdateBinItemAsync(binItem);

            if (await _binItemRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update item.");
        }
    }
}