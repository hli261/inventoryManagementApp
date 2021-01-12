using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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

        [HttpGet("email/{email}")] //get user by login email
        public async Task<ActionResult<MemberDto>> GetUser(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            return _mapper.Map<MemberDto>(user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetUser(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            return _mapper.Map<MemberDto>(user);
        }

        [HttpPut("{id}")]
       public async Task<ActionResult> UpdateUser(int id, MemberUpdateDto memberUpdateDto)
        //public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {

            var user = await _userRepository.GetUserByIdAsync(id);

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Firstname))
                user.FirstName = memberUpdateDto.Firstname;

            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Lastname))
                user.LastName = memberUpdateDto.Lastname;


            using var hmac = new HMACSHA512();
            // update password if provided
            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Password))
            {
                byte[] passwordHash, passwordSalt;

                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(memberUpdateDto.Password));
                passwordSalt = hmac.Key;
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            user.Active = memberUpdateDto.Active;
            // var userEmail = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            // var user = await _userRepository.GetUserByEmailAsync(userEmail);

        //    _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if(await _userRepository.SaveAllAsync())  return Ok();   //return NoContent();

            return BadRequest("Failed to update user");

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