using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IBinItemRepository
    {
        void AddBinItem(BinItem binItem);
        void DeleteBinItem(BinItem binItem);
        void UpdateBinItemAsync(BinItem binItem);

        Task<IEnumerable<BinItem>> GetBinItems();

        Task<IEnumerable<BinItemQueryDto>> GetBinItemsByBinCode(string code);
        Task<PagedList<BinItem>> GetBinItemsByBinCodePaging(string code, PagingParams binItemParams);
        Task<IEnumerable<BinItemQueryDto>> GetBinItemsByItemNumber(string number);
        Task<PagedList<BinItem>> GetBinItemsAsync(PagingParams binItemParams); //paging
        Task<BinItem> GetBinItemById(int id);

        Task<bool> SaveAllAsync();

        Task<BinItem> GetBinItemByThree(string code, string number, string lot);

    }
}