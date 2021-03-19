using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IReceivingItemRepository
    {
        Task<bool> SaveAllAsync();
        void AddReceivingItemAsync(ReceivingItem receivingItem);
        Task<IEnumerable<ReceivingItem>> GetReceivingItemsByLOTAsync(string lotNum);
        Task<IEnumerable<ReceivingItem>> GetReceivingItemsByROAsync(string roNum);
        Task<PagedList<ReceivingItem>> GetReceivingItemParamByROAsync(string roNum, PagingParams receivingItemParams);

        Task<ReceivingItem> GetReceivingItemInReceivingByItemNumberAsync(string roNum, string itemNumber);
        void UpdateReceivingItem(ReceivingItem receivingItem);

        Task<bool> ItemExist(string number);
        void DeleteReceivingItems(IEnumerable<ReceivingItem> receivingItems);
    }
}