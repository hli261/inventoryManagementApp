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
        public ReceivingController(UserManager<AppUser> userManager, IShippingRepository shippingRepository, IVenderRepository venderRepository, IERPRepository eRPRepository, IMapper mapper)
        {
            _mapper = mapper;
            _shippingRepository = shippingRepository;
            _userManager = userManager;
            _venderRepository = venderRepository;
            _erpRepository = eRPRepository;
        }

        [HttpGet("receivingOrder")]
        public async Task<ActionResult<GetReceivingDto>> GetROExist(ReceivingOrderDto receiving)
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

            var getReceivingDto = new GetReceivingDto
            {
                PONumber = receiving.PONumber,
                ERP_POitems = poItem,
                OrderDate = po.OrderDate,
                // DateRequired = po.DateRequired,
                Shipping = shippingNo,
            };

            return Ok(getReceivingDto);
        }


        [HttpPost("createReceiving")]
        public async Task<ActionResult<Receiving>> CreateReceiving(CreateReceivingDto receivingDto)
        {
            // var shipping = _mapper.Map<Shipping>(shippingDto);

            // shipping.Vender = await _venderRepository.GetVenderByNumber(shippingDto.VenderNo.ToUpper());
            // shipping.User = await _userManager.FindByEmailAsync(shippingDto.UserEmail);
            // shipping.ShippingNumber = "SN" + _shippingRepository.LotCountAsync().ToString().PadLeft(7, '0');
            // shipping.ShippingMethod = await _venderRepository.GetShippingMethodbyName(shippingDto.LogisticName.ToUpper());

            // _shippingRepository.AddShippingAsync(shipping);

            // if (await _shippingRepository.SaveAllAsync())

            //     return Ok(shipping);

            // return BadRequest("Failed to add shipping.");
            return Ok();
        }

    }
}