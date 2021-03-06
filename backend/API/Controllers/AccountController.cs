using System.Collections.Generic;
using System.Linq;
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
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using MailKit.Net.Smtp;
using MimeKit;

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

        [HttpPost("register")] //add email confirmation
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Email)) return BadRequest("Email is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.Active = false;

            user.UserName = registerDto.Email;

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            // if (!result.Succeeded) return BadRequest(result.Errors);
            if (!result.Succeeded) return BadRequest("Passwords must be at least 6 characters\n" +
                                                     "Passwords must have at least one digit ('0'-'9')\n" +
                                                     "Passwords must have at least one lowercase ('a'-'z')\n" +
                                                     "Passwords must have at least one uppercase ('A'-'Z')");

            // var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            // if (!roleResult.Succeeded) return BadRequest(result.Errors);
            var userDetail = "<h4>User Info</h4>" +
            $"</br> <p>User Id: {user.Id}</p>" +
            $"</br> <p>User Name: {user.FirstName + " " + user.LastName}</p>" +
            $"</br> <p>User Account: {user.Email}</p>";

            SendMail("Admin", "prj666testing@gmail.com", "New User Created", userDetail);

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

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
                Id = user.Id,
                Active = user.Active
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
            if (user == null) return NotFound("Could not find the user");

            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                var result = await _userManager.ResetPasswordAsync(user, token, memberUpdateDto.Password);

                if (!result.Succeeded) return BadRequest("Failed to update password");
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Firstname))
            {
                user.FirstName = memberUpdateDto.Firstname;
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded) return BadRequest("Failed to update Firstname");
            }

            if (!string.IsNullOrWhiteSpace(memberUpdateDto.Lastname))
            {
                user.LastName = memberUpdateDto.Lastname;
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded) return BadRequest("Failed to update Lastname");
            }

            if (memberUpdateDto.Active == true || memberUpdateDto.Active == false)
            {
                user.Active = memberUpdateDto.Active;
                var result = await _userManager.UpdateAsync(user);
                if (!result.Succeeded) return BadRequest("Failed to update active");
            }

            return Ok();

        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var param = new Dictionary<string, string> { { "token", token }, { "email", forgotPasswordDto.Email } };

            var callback = QueryHelpers.AddQueryString("https://localhost:4200/reset-password", param);

            SendMail(forgotPasswordDto.Email, forgotPasswordDto.Email, "Reset Password", $"<a href=`{callback}`>Click to reset Password</a>");

            return Ok();
        }


        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null)
                return BadRequest("Invalid Request");

            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);

            if (!resetPassResult.Succeeded)
            {
                var errors = resetPassResult.Errors.Select(e => e.Description);
                return BadRequest(new { Errors = errors });
            }

            SendMail(resetPasswordDto.Email, resetPasswordDto.Email, "Password Reseted", "Your password has been reseted");

            return Ok();
        }

        private void SendMail(string userName, string userEmail, string emailSubject, string emailBody)
        {
            MimeMessage message = new MimeMessage();

            MailboxAddress from = new MailboxAddress("Admin", "prj666testing@gmail.com");
            message.From.Add(from);

            MailboxAddress to = new MailboxAddress(userName, userEmail);
            // MailboxAddress to = new MailboxAddress("User A", "54sakkie@gmail.com"); //my own email to test only, replace with forgotPasswordDto.Email to use it
            message.To.Add(to);

            message.Subject = emailSubject;

            BodyBuilder bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = emailBody;
            //bodyBuilder.TextBody = "Hello World!  " + callback;

            message.Body = bodyBuilder.ToMessageBody();

            SmtpClient client = new SmtpClient();
            client.Connect("smtp.gmail.com", 465, true);
            client.Authenticate("prj666666666666666666666666666@gmail.com", "WASDabcde13579!!!!!...............");

            client.Send(message);
            client.Disconnect(true);
            client.Dispose();
        }

    }
}