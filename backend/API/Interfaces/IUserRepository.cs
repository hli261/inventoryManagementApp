using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser userParam);

         Task<bool> SaveAllAsync();

         Task<IEnumerable<AppUser>> GetUsersAsync();

         Task<AppUser> GetUserByIdAsync(int id);

         Task<AppUser> GetUserByEmailAsync(string email);
         Task<bool> Delete(int id);
    }
}