using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public AdminController(UserManager<AppUser> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;

        }

        [HttpGet("users-with-roles")]
        // [Authorize(Policy = "RequireAdminRole")] //enable this to only allow admin to access
        // [Authorize(Role = "Admin")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await _userManager
            .Users.Include(r => r.UserRoles)
            .ThenInclude(r => r.Role)
            .OrderBy(u => u.UserName) //sort the users by name
            .Select(u => new
            {
                u.Id,
                Username = u.UserName,
                Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
            }).ToListAsync();

            return Ok(users);
        }

        [HttpGet("user-with-roles/{email}")]
        // [Authorize(Policy = "RequireAdminRole")] //enable this to only allow admin to access
        // [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetUserWithRoles(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(roles);
        }


        [HttpPost("edit-roles/{email}")] //email is the username
        // [Authorize(Policy = "RequireAdminRole")] //enable this to only allow admin to access
        // [Authorize(Roles = "Admin")]
        public async Task<ActionResult> EditRoles(string email, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return NotFound("Could not find the user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }


    }
}