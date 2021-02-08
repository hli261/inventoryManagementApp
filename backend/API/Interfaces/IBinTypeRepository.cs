using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IBinTypeRepository
    {
        void AddBinType(BinType binType);
        void DeleteBinType (BinType binType);

        void UpdateBinType (BinType binType);

        Task<IEnumerable<BinType>> GetBinTypes();

        Task<BinType> GetBinTypeById(int id);

        Task<BinType> GetBinTypeByName(string name);

        Task<bool> SaveAllAsync();

    }
}