using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IShippingRepository
    {
        void AddShippingAsync(Shipping shipping);

        // void DeleteItem(Item item);

        // void UpdateItem(Item item);

        // Task<IEnumerable<Item>> GetItems();
        // Task<PagedList<Item>> GetItemsAsync(PagingParams itemParams); //paging
        // Task<Item> GetItemById(int id);

        // Task<Item> GetItemByNumber(string number);
        Task<IEnumerable<Shipping>> GetShippingsAsync();
        Task<bool> SaveAllAsync();

        Task<bool> ExistAsync(string shippingNum);
    }
}