using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IWarehouseLocationRepository
    {
        void AddWarehouseLocation(WarehouseLocation warehouseLocation);
        void DeleteWarehouseLocation (WarehouseLocation warehouseLocation);

        void UpdateWarehouseLocation (WarehouseLocation warehouseLocation);

        Task<IEnumerable<WarehouseLocation>> GetWarehouseLocations();

        Task<WarehouseLocation> GetWarehouseLocationById(int id);

        Task<bool> SaveAllAsync();
    }
}