using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IBinItemRepository
    {
        void AddBinItem(BinItem binItem);
        void DeleteBinItem(BinItem binItem);
        void UpdateBinItem(BinItem binItem);

        Task<IEnumerable<BinItem>> GetBinItems();

        Task<BinItem> GetBinItemById(int id);

        Task<bool> SaveAllAsync();

    }
}