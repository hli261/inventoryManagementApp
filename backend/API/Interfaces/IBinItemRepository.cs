using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IBinItemRepository
    {
        void AddBinItem(BinItem binItem);
        void DeleteBinItem(BinItem binItem);
        void UpdateBinItem(BinItem binItem);

        Task<IEnumerable<BinItem>> GetBinItems();
        Task<PagedList<BinItem>> GetBinItemsAsync(PagingParams binItemParams); //paging
        Task<BinItem> GetBinItemById(int id);

        Task<bool> SaveAllAsync();

    }
}