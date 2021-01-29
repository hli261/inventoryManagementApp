using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IBinRepository
    {
         void AddBin(Bin bin);
        void DeleteBin (Bin bin);

        void UpdateBin (Bin bin);

         Task<IEnumerable<Bin>> GetBins();
         Task<IEnumerable<Bin>> GetBinsByType(string type);
         Task<IEnumerable<Bin>> GetBinsByWarehouse(string warehouse);


         Task<Bin> GetBinByCode(string code);

         Task<bool> SaveAllAsync();
    }
}