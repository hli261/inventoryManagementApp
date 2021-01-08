using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.Email == email);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

//implement needed
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
//         public void Update(AppUser userParam, string password = null)
//         {
//             var user = _context.Users.Find(userParam.Id);

//             // update username if it has changed
//             if (!string.IsNullOrWhiteSpace(userParam.Email) && userParam.Email != user.Email)
//             {
//                 // throw error if the new username is already taken
//                 if (_context.Users.Any(x => x.Email == userParam.Email))
//                 //    throw new AppException("Username " + userParam.Username + " is already taken");

//                 user.Email = userParam.Email;
//             }

//             // update user properties if provided
//             if (!string.IsNullOrWhiteSpace(userParam.FirstName))
//                 user.FirstName = userParam.FirstName;

//             if (!string.IsNullOrWhiteSpace(userParam.LastName))
//                 user.LastName = userParam.LastName;


//             using var hmac = new HMACSHA512();
//             // update password if provided
//             if (!string.IsNullOrWhiteSpace(password))
//             {
//                 byte[] passwordHash, passwordSalt;
//    //             CreatePasswordHash(password, out passwordHash, out passwordSalt);

//                 passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
//                 passwordSalt = hmac.Key;
//                 user.PasswordHash = passwordHash;
//                 user.PasswordSalt = passwordSalt;
//             }

//             _context.Users.Update(user);
//             _context.SaveChanges();
//         }
//
        public async Task<bool> Delete(int id){
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
            return await _context.SaveChangesAsync() > 0;
            }else{
                return false;
            }
        }
    }
}