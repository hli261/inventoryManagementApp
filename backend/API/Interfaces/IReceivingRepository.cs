using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IReceivingRepository
    {
        Task<bool> SaveAllAsync();
        int CountAsync();

        void AddReceivingAsync(Receiving receiving);
    }
}