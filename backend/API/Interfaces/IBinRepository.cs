using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IBinRepository
    {
        void AddBin(Bin bin);
        void DeleteBin(Bin bin);

        Task UpdateBinAsync(Bin bin);

        Task<IEnumerable<Bin>> GetBins();
        
       //Task<PagedList<Bin>> GetBinsAsync(PagingParams binParams); //paging

        Task<PagedList<BinDto>> GetBinsByParams(BinParams binParams);
        Task<IEnumerable<Bin>> GetBinsByTypeId(int id);
        Task<IEnumerable<Bin>> GetBinsByType(string type);
        Task<IEnumerable<Bin>> GetBinsByWarehouse(string warehouse);
        Task<IEnumerable<Bin>> GetBinsByWarehouseLocationId(int id);

        Task<Bin> GetBinByCode(string code);

        Task<bool> SaveAllAsync();
    }
}