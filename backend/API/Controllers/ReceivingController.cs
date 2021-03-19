using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReceivingController : BaseApiController
    {
        private readonly IShippingRepository _shippingRepository;
        private readonly IVenderRepository _venderRepository;
        private readonly IERPRepository _erpRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IReceivingItemRepository _receivingItemRepository;
        private readonly IReceivingRepository _receivingRepository;

        private readonly IItemRepository _itemRepository;
        public ReceivingController(UserManager<AppUser> userManager, IShippingRepository shippingRepository,
         IVenderRepository venderRepository, IERPRepository eRPRepository, IMapper mapper,
         IReceivingItemRepository receivingItemRepository, IReceivingRepository receivingRepository,
         IItemRepository itemRepository)
        {
            _mapper = mapper;
            _shippingRepository = shippingRepository;
            _userManager = userManager;
            _venderRepository = venderRepository;
            _erpRepository = eRPRepository;
            _receivingItemRepository = receivingItemRepository;
            _receivingRepository = receivingRepository;
            _itemRepository = itemRepository;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Receiving>>> GetReceivings()
        {
            var receivings = await _receivingRepository.GetReceivingsAsync();

            return Ok(_mapper.Map<IEnumerable<GetReceivingHeaderDto>>(receivings));
        }

        [HttpGet("receivingByRO/{roNum}")]
        public async Task<ActionResult<Receiving>> GetReceiving(string roNum)
        {
            var receiving = await _receivingRepository.GetReceivingByROAsync(roNum);

            return Ok(_mapper.Map<GetReceivingHeaderDto>(receiving));
        }

        [HttpGet("receivingItemsByRO/{roNum}")]
        public async Task<ActionResult<IEnumerable<ReceivingItem>>> GetReceivingItems(string roNum)
        {
            var receivingItems = await _receivingItemRepository.GetReceivingItemsByROAsync(roNum);

            return Ok(_mapper.Map<IEnumerable<GetReceivingItemDto>>(receivingItems));
        }


        [HttpGet("createROHeader")]
        public async Task<ActionResult<GetReceivingHeaderDto>> GetROExist([FromQuery] ReceivingOrderDto receiving)
        {
            var vender = await _venderRepository.GetVenderByNumber(receiving.VenderNo.ToUpper());
            var shippingNo = await _shippingRepository.GetShippingByNumber(receiving.ShippingNumber.ToUpper());
            var po = await _erpRepository.GetReceivingByPO(receiving.PONumber.ToUpper());

            if (vender == null)
                return BadRequest("Vender does not exist.");

            if (shippingNo == null)
                return BadRequest("Shipping Number does not exist.");

            if (po == null)
                return BadRequest("Purchase Order does not exist.");

            var roNumber = "RO" + receiving.PONumber + receiving.ShippingNumber + receiving.VenderNo;

            if (await _receivingRepository.ROExist(roNumber)) return BadRequest("RO Number already Exist");

            var getReceiving = new Receiving
            {
                PONumber = receiving.PONumber,
                RONumber = roNumber,
                ShippingNumber = receiving.ShippingNumber,
                LotNumber = shippingNo.ShippingLot.LotNumber,
                VenderNo = receiving.VenderNo,
                UserEmail = receiving.UserEmail,
                // CreateDate 
                Status = "DRAFT",
                // GetReceivingItemDtos = getReceivingItemDtos,
                OrderDate = po.OrderDate,
                // Shipping = shippingNo,
            };

            _receivingRepository.AddReceivingAsync(getReceiving);

            if (await _receivingRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Order.");

            var poItem = await _erpRepository.GetReceivingItemByPO(receiving.PONumber.ToUpper());
            var rec = await _receivingRepository.GetReceivingByROAsync(getReceiving.RONumber);

            // if (shippingNo == null)
            //     return BadRequest("Shipping Number does not exist.");

            if (poItem == null)
                return BadRequest("PO item not found");

            List<ReceivingItem> roItems = new List<ReceivingItem>();

            foreach (ERP_POitem element in poItem)
            {
                var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());

                var roItem = new ReceivingItem
                {
                    LotNumber = shippingNo.ShippingLot.LotNumber,
                    ItemNumber = element.ItemNumber,
                    ItemDescription = item.ItemDescription,
                    OrderQty = element.OrderQty,
                    Receiving = rec
                };
                roItems.Add(roItem);
                _receivingItemRepository.AddReceivingItemAsync(roItem);
            }

            if (await _receivingItemRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Item.");

            getReceiving.ReceivingItems = roItems;


            _receivingRepository.UpdateReceiving(getReceiving);

            if (await _receivingRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Order.");

            return Ok(_mapper.Map<GetReceivingHeaderDto>(getReceiving));
        }


        //    [HttpPost("loadRoItems/{roNum}")]
        // [HttpPut("loadRoItems/{roNum}")]
        // public async Task<ActionResult<IEnumerable<GetReceivingItemDto>>> LoadRoItems(string roNum)//(GetReceivingHeaderDto receiving)
        // {
        //     if (await _receivingRepository.ROExist(roNum) == false)
        //         return BadRequest("RO not Exist");

        //     //get ro from databse and continue to work on that
        //     var ro = await _receivingRepository.GetReceivingByROAsync(roNum);
        //     var items = await _receivingItemRepository.GetReceivingItemsByROAsync(roNum);
        //     if (items.Any() == true)
        //     {
        //         //check status
        //         if (ro.Status == "SUBMIT") return BadRequest("Can not edit submitted receiving order");

        //         //get and return
        //         return Ok(_mapper.Map<IEnumerable<GetReceivingItemDto>>(items));
        //     }

        //     var shippingNo = await _shippingRepository.GetShippingByNumber(ro.ShippingNumber.ToUpper());
        //     var poItem = await _erpRepository.GetReceivingItemByPO(ro.PONumber.ToUpper());

        //     if (shippingNo == null)
        //         return BadRequest("Shipping Number does not exist.");

        //     if (poItem == null)
        //         return BadRequest("PO item not found");

        //     List<GetReceivingItemDto> roItems = new List<GetReceivingItemDto>();

        //     foreach (ERP_POitem element in poItem)
        //     {
        //         var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());

        //         var roItem = new GetReceivingItemDto
        //         {
        //             LotNumber = shippingNo.ShippingLot.LotNumber,
        //             ItemNumber = element.ItemNumber,
        //             ItemDescription = item.ItemDescription,
        //             OrderQty = element.OrderQty
        //         };
        //         roItems.Add(roItem);
        //     }

        //     return Ok(roItems);
        // }



        // [HttpPost("createReceiving")]
        // public async Task<ActionResult<Receiving>> CreateReceiving(GetReceivingHeaderDto receivingDto)
        // {
        //     //Note: change to automapper here.
        //     var receiving = await _receivingRepository.GetReceivingByROAsync(receivingDto.RONumber);
        //     if (receiving.Status == "SUBMIT")
        //         return BadRequest("Can not edit submitted receiving order");

        //     //convert ERP_POITEM into ReceivingItems with relationship to Item
        //     foreach (GetReceivingItemDto element in receivingDto.GetReceivingItemDtos)
        //     {
        //         var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());

        //         var roItem = _mapper.Map<ReceivingItem>(element);
        //         roItem.Receiving = receiving;

        //         _receivingItemRepository.AddReceivingItemAsync(roItem);
        //     }

        //     if (await _receivingItemRepository.SaveAllAsync() == false)
        //         return BadRequest("Failed to add Receiving Item.");

        //     //get all of them by LotNumber into one object
        //     var roItems = await _receivingItemRepository.GetReceivingItemsByROAsync(receivingDto.RONumber);
        //     receiving.ReceivingItems = roItems;

        //     receiving.Status = receivingDto.Status;


        //     _receivingRepository.UpdateReceiving(receiving);

        //     if (await _receivingRepository.SaveAllAsync() == false)
        //         return BadRequest("Failed to add Receiving Order.");

        //     return Ok(_mapper.Map<GetReceivingHeaderDto>(receiving));
        // }


        [HttpPut("update/{roNum}")]
        public async Task<ActionResult> Update(IEnumerable<GetReceivingItemDto> receivingItemsDto, string roNum)
        {
            var receiving = await _receivingRepository.GetReceivingByROAsync(roNum);
            var receivingItems = await _receivingItemRepository.GetReceivingItemsByROAsync(roNum);

            if (receiving == null)
                return BadRequest("RO can not be found.");

            if (receiving.Status.ToUpper() == "SUBMIT")
                return BadRequest("Submitted RO cannot be changed");

            foreach (GetReceivingItemDto element in receivingItemsDto)
            {
                // var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());
                var receivingItemsObj = receivingItemsDto.FirstOrDefault(i => i.ItemNumber == element.ItemNumber);

                if (receivingItemsObj.ItemNumber != null && receivingItemsObj.ItemNumber != "string")
                {
                    var roItem = await _receivingItemRepository.GetReceivingItemInReceivingByItemNumberAsync(roNum, element.ItemNumber);
                    roItem.ReceiveQty = receivingItemsObj.ReceiveQty;
                    roItem.DiffQty = receivingItemsObj.DiffQty;
                    roItem.ExpireDate = receivingItemsObj.ExpireDate;
                    _receivingItemRepository.UpdateReceivingItem(roItem);
                }
            }

            if (await _receivingItemRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Item.");

            return Ok(_mapper.Map<GetReceivingHeaderDto>(receiving));
        }


        [HttpPut("updateStatus/{roNum}/{status}")]
        public async Task<ActionResult<Receiving>> EditROStatusByRO(string roNum, string status)
        {
            var receiving = await _receivingRepository.GetReceivingByROAsync(roNum);
            receiving.Status = status;

            _receivingRepository.UpdateReceiving(receiving);

            if (await _receivingRepository.SaveAllAsync())
            {
                return Ok(_mapper.Map<GetReceivingHeaderDto>(receiving));
            }

            return BadRequest("Failed to update receiving");
        }

        // [HttpPut("updateStatus/{roNum}/{status}")]
        // public async Task<ActionResult<IEnumerable<ReceivingItem>>> EditReceivingStatusByRO(string roNum, string status)
        // {
        //     var receiving = await _receivingRepository.GetReceivingByROAsync(roNum);
        //     receiving.Status = status;

        //     _receivingRepository.UpdateReceiving(receiving);

        //     if (await _receivingRepository.SaveAllAsync())
        //     {
        //         return Ok(_mapper.Map<GetReceivingHeaderDto>(receiving));
        //     }

        //     return BadRequest("Failed to update receiving");
        // }


        [HttpGet("getReceivingByStatus/{status}")]
        public async Task<ActionResult<IEnumerable<ReceivingItem>>> GetReceivingByStatus(string status)
        {
            var receiving = await _receivingRepository.GetReceivingByStatusAsync(status.ToUpper());

            return Ok(_mapper.Map<IEnumerable<GetReceivingHeaderDto>>(receiving));
        }

    }
}

