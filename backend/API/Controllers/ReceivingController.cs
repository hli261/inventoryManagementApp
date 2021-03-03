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
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public ReceivingController(UserManager<AppUser> userManager, IShippingRepository shippingRepository, IVenderRepository venderRepository, IMapper mapper)
        {
            _mapper = mapper;
            _shippingRepository = shippingRepository;
            _userManager = userManager;
            _venderRepository = venderRepository;
        }

    }
}