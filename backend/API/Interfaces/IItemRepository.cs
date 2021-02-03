using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IItemRepository
    {
        void AddItem(Item item);

        void DeleteItem(Item item);

        void UpdateItem(Item item);

        Task<IEnumerable<Item>> GetItems();
        Task<PagedList<Item>> GetItemsAsync(PagingParams itemParams); //paging
        Task<Item> GetItemById(int id);

        Task<bool> SaveAllAsync();
    }
}