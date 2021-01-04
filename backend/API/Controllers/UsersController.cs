using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

            return Ok(usersToReturn);
        }

        // [HttpGet("{email}")] //get user by login email
        // public async Task<ActionResult<MemberDto>> GetUser(string email)
        // {
        //     var user = await _userRepository.GetUserByEmailAsync(email);
        //     return _mapper.Map<MemberDto>(user);
        // }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return _mapper.Map<MemberDto>(user);
        }


        //testing only
        // [HttpPost]
        // public async Task<ActionResult<AppUser>> Register(AppUser model)
        // {
        //     _context.Add(model);
        //     await _context.SaveChangesAsync();
        //     return Ok();
        // }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteUser(int id){
            var user = await _userRepository.GetUserByIdAsync(id);

            if (user == null) return NotFound(); //?
            
         //   _userRepository.Delete(id);
            return Ok(await _userRepository.Delete(id));
        }
    }
}