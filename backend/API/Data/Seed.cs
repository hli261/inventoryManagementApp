using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager,
         RoleManager<AppRole> roleManager){
           ////seed the database if there is no sample data inside the database
            // if(await userManager.Users.AnyAsync()) return;

            // var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");

            // var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            // if(users == null) return;

            if(await roleManager.Roles.AnyAsync()) return; //exit when there is any roles in the database

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Admin"},
                new AppRole{Name = "PutAway"},
                new AppRole{Name = "BinManagement"},
                new AppRole{Name = "Receiving"},
                new AppRole{Name = "Replenishment"}
            };

            foreach (var role in roles){
                await roleManager.CreateAsync(role);
            }

            // foreach (var user in users){
            //     user.UserName = user.UserName.ToLower();

            //     await userManager.CreateAsync(user, "Password123!");
            //     await userManager.AddToRoleAsync(user, "Member");
            // }

            var admin = new AppUser{
                FirstName = "admin",
                LastName = "group10",
                UserName = "admin@admin.com",
                Email = "admin@admin.com",
                Active = true
            };

            await userManager.CreateAsync(admin, "Password123!");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "PutAway", "BinManagement", "Receiving","Replenishment"});
        }
    }
}