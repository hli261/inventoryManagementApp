using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.Active = true;

            user.UserName = registerDto.Email;

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if(!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Id = user.Id
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("Invalid email");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Id = user.Id
            };
        }


        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == username.ToLower());
        }

       [HttpPut("update/{email}")]
       public async Task<ActionResult> UpdateUser(string email, MemberUpdateDto memberUpdateDto)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null) return NotFound("Could not find the user");

            if(!string.IsNullOrWhiteSpace(memberUpdateDto.Password))
            {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, memberUpdateDto.Password);

            if(!result.Succeeded) return BadRequest("Failed to update password");
            }
    
            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Firstname))
            {
                user.FirstName = memberUpdateDto.Firstname;
                var result = await _userManager.UpdateAsync(user);
                if(!result.Succeeded) return BadRequest("Failed to update Firstname");
            }

            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Lastname))
            {
                user.LastName = memberUpdateDto.Lastname;
                var result = await _userManager.UpdateAsync(user);
                if(!result.Succeeded) return BadRequest("Failed to update Lastname");
            }

            if(memberUpdateDto.Active == true || memberUpdateDto.Active == false){
                user.Active = memberUpdateDto.Active;
                var result = await _userManager.UpdateAsync(user);
                if(!result.Succeeded) return BadRequest("Failed to update active");
            }

            return Ok();

        }



    }
}