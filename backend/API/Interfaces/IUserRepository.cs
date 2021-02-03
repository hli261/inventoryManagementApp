using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser userParam);

        Task<bool> SaveAllAsync();

        Task<PagedList<MemberDto>> GetUsersAsync(PagingParams userParams); //paging
        Task<IEnumerable<AppUser>> GetUsersAsync();

        Task<AppUser> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByEmailAsync(string email);
        Task<bool> Delete(int id);
        Task GetUserByEmailAsync(object p);
    }
}