using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IReceivingRepository
    {
        Task<bool> SaveAllAsync();
        int CountAsync();

        void AddReceivingAsync(Receiving receiving);

        Task<Receiving> GetReceivingByROAsync(string roNumber);


        void UpdateReceiving(Receiving receiving);

        Task<IEnumerable<Receiving>> GetReceivingsAsync();
        Task<bool> ROExist(string roNo);
        Task<IEnumerable<Receiving>> GetReceivingByStatusAsync(string status);
    }
}