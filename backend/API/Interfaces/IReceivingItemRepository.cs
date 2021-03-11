using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IReceivingItemRepository
    {
        Task<bool> SaveAllAsync();
        void AddReceivingItemAsync(ReceivingItem receivingItem);
        Task<IEnumerable<ReceivingItem>> GetReceivingItemsByLOTAsync(string lotNum);
    }
}