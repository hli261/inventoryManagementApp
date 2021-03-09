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

        [HttpGet("receivingOrder")]
        public async Task<ActionResult<GetReceivingDto>> GetROExist([FromQuery] ReceivingOrderDto receiving)
        {
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

            List<GetReceivingItemDto> getReceivingItemDtos = new List<GetReceivingItemDto>();

            foreach (ERP_POitem element in poItem)
            {
                var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());

                var getReceivingItemDto = new GetReceivingItemDto
                {
                    PONumber = element.PONumber,
                    ItemNumber = element.ItemNumber,
                    ItemDescription = item.ItemDescription,
                    OrderQty = element.OrderQty
                };
                getReceivingItemDtos.Add(getReceivingItemDto);
            }

            var getReceivingDto = new GetReceivingDto
            {
                PONumber = receiving.PONumber,
                // ERP_POitems = poItem,
                GetReceivingItemDtos = getReceivingItemDtos,
                OrderDate = po.OrderDate,
                Shipping = shippingNo,
            };

            return Ok(getReceivingDto);
        }


        [HttpPost("createReceiving")]
        public async Task<ActionResult<Receiving>> CreateReceiving(CreateReceivingDto receivingDto)
        {
            var roNumber = "RO" + _receivingRepository.CountAsync().ToString().PadLeft(7, '0');

            //Note: change to automapper here.
            var receiving = new Receiving
            {
                ROnumber = roNumber,
                PONumber = receivingDto.PONumber,
                ShippingNumber = receivingDto.ShippingNumber,
                LotNumber = receivingDto.LotNumber,
                VenderNo = receivingDto.VenderNo,
                UserEmail = receivingDto.UserEmail,
                ArrivalDate = receivingDto.ArrivalDate,
                Status = receivingDto.Status,
            };

            _receivingRepository.AddReceivingAsync(receiving);

            if (await _receivingRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Order.");

            var recForROItem = await _receivingRepository.GetReceivingByROAsync(roNumber);

            //convert ERP_POITEM into ReceivingItems with relationship to Item
            foreach (ROitemsDto element in receivingDto.ROitems)
            {
                var item = await _itemRepository.GetItemByNumber(element.ItemNumber.ToUpper());

                var roItem = new ReceivingItem
                {
                    PONumber = element.PONumber,
                    Item = item,
                    OrderQty = element.OrderQty,
                    ReceiveQty = element.ReceiveQty,
                    DiffQty = element.DiffQty,
                    ExpireDate = element.ExpireDate,
                    Receiving = recForROItem
                };

                _receivingItemRepository.AddReceivingItemAsync(roItem);
            }

            if (await _receivingItemRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Item.");

            //get all of them by PONumber into one object
            var roItems = await _receivingItemRepository.GetReceivingItemsByPOAsync(receivingDto.PONumber);
            recForROItem.ReceivingItems = roItems;

            _receivingRepository.UpdateReceiving(recForROItem);

            if (await _receivingRepository.SaveAllAsync() == false)
                return BadRequest("Failed to add Receiving Order.");

            return Ok(receiving);
        }

    }
}

