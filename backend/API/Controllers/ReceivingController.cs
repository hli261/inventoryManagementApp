using System;
using System.Collections;
using System.Collections.Generic;
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

            return Ok(receivings);
        }

        [HttpGet("receivingByRO/{roNum}")]
        public async Task<ActionResult<Receiving>> GetReceiving(string roNum)
        {
            var receiving = await _receivingRepository.GetReceivingByROAsync(roNum);

            return Ok(receiving);
        }

        [HttpGet("receivingItemsByRO/{roNum}")]
        public async Task<ActionResult<IEnumerable<ReceivingItem>>> GetReceivingItems(string roNum)
        {
            var receivingItems = await _receivingItemRepository.GetReceivingItemsByROAsync(roNum);

            return Ok(receivingItems);
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

            var getReceivingDto = new GetReceivingHeaderDto
            {
                PONumber = receiving.PONumber,
                RONumber = roNumber,
                ShippingNumber = receiving.ShippingNumber,
                LotNumber = shippingNo.ShippingLot.LotNumber,
                VenderNo = receiving.VenderNo,
                // User Email
                // CreateDate 
                Status = "DRAFT",
                // GetReceivingItemDtos = getReceivingItemDtos,
                OrderDate = po.OrderDate,
                // Shipping = shippingNo,
            };
            return Ok(getReceivingDto);
        }


        [HttpPost("loadRoItems")]
        public async Task<ActionResult<IEnumerable<GetReceivingItemDto>>> LoadRoItems(GetReceivingHeaderDto receiving)
        {
            if (await _receivingRepository.ROExist(receiving.RONumber))
            {//get ro from databse and continue to work on that
                var ro = await _receivingRepository.GetReceivingByROAsync(receiving.RONumber);
                var items = await _receivingItemRepository.GetReceivingItemsByROAsync(receiving.RONumber);

                //check status
                if (ro.Status == "SUBMIT") return BadRequest("Can not edit submitted receiving order");

                //get and return
                return Ok(_mapper.Map<IEnumerable<GetReceivingItemDto>>(items));
            }
            var vender = await _venderRepository.GetVenderByNumber(receiving.VenderNo.ToUpper());
            var shippingNo = await _shippingRepository.GetShippingByNumber(receiving.ShippingNumber.ToUpper());
            var po = await _erpRepository.GetReceivingByPO(receiving.PONumber.ToUpper());
            var poItem = await _erpRepository.GetReceivingItemByPO(receiving.PONumber.ToUpper());

            if (vender == null)
                return BadRequest("Vender does not exist.");

            if (shippingNo == null)
                return BadRequest("Shipping Number does not exist.");

            if (po == null)
                return BadRequest("Purchase Order does not exist.");

            if (poItem == null)
                return BadRequest("PO item not found");

            List<GetReceivingItemDto> roItems = new List<GetReceivingItemDto>();

            foreach (ERP_POitem element in poItem)
            {
                var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());

                var roItem = new GetReceivingItemDto
                {
                    LotNumber = shippingNo.ShippingLot.LotNumber,
                    ItemNumber = element.ItemNumber,
                    ItemDescription = item.ItemDescription,
                    OrderQty = element.OrderQty
                };
                roItems.Add(roItem);
            }

            return Ok(roItems);
        }


        [HttpPost("createReceiving")]
        public async Task<ActionResult<Receiving>> CreateReceiving(GetReceivingHeaderDto receivingDto)
        {
            //Note: change to automapper here.
            var receiving = _mapper.Map<Receiving>(receivingDto);

            _receivingRepository.AddReceivingAsync(receiving);

            if (await _receivingRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Order.");

            var recForROItem = await _receivingRepository.GetReceivingByROAsync(receivingDto.RONumber);

            //convert ERP_POITEM into ReceivingItems with relationship to Item
            foreach (GetReceivingItemDto element in receivingDto.GetReceivingItemDtos)
            {
                var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());

                var roItem = _mapper.Map<ReceivingItem>(element);
                roItem.Receiving = recForROItem;

                _receivingItemRepository.AddReceivingItemAsync(roItem);
            }

            if (await _receivingItemRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Item.");

            //get all of them by LotNumber into one object
            var roItems = await _receivingItemRepository.GetReceivingItemsByLOTAsync(receivingDto.LotNumber);
            recForROItem.ReceivingItems = roItems;

            _receivingRepository.UpdateReceiving(recForROItem);

            if (await _receivingRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Order.");

            return Ok(receiving);
        }


        // [HttpPut("update/{roNum}")]
        // public async Task<ActionResult> UpdateReceiving(UpdateShippngDto shippingDto, string roNum)
        // {
        //     var receiving = await _receivingRepository.GetReceivingByROAsync(roNum);

        //     if (receiving == null)
        //         return BadRequest("Shipping Number not found.");

        //     if (receiving.Status.ToUpper() == "SUBMIT")
        //         return BadRequest("Submitted RO cannot be changed");

        //     var user = await _userManager.FindByEmailAsync(shippingDto.UserEmail);
        //     var vender = await _venderRepository.GetVenderByNumber(shippingDto.VenderNo);
        //     var shipMethod = await _venderRepository.GetShippingMethodbyName(shippingDto.LogisticName);

        //     shipping.ArrivalDate = shippingDto.ArrivalDate;
        //     shipping.InvoiceNumber = shippingDto.InvoiceNumber;
        //     shipping.ShippingMethod = shipMethod;
        //     shipping.User = user;
        //     shipping.Vender = vender;

        //     _shippingRepository.UpdateShipping(shipping);


        //     if (await _shippingRepository.SaveAllAsync())
        //     {
        //         return Ok(shipping);
        //     }
        //     return BadRequest("Failed to update shipping.");
        // }

    }
}

