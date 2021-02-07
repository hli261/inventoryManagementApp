using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class WarehouseLocationRepository : IWarehouseLocationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public WarehouseLocationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public void AddWarehouseLocation(WarehouseLocation warehouseLocation)
        {
            _context.WarehouseLocations.Add(warehouseLocation);
        }

        public void DeleteWarehouseLocation(WarehouseLocation warehouseLocation)
        {
            _context.WarehouseLocations.Remove(warehouseLocation);
        }

        public async Task<WarehouseLocation> GetWarehouseLocationById(int id)
        {
            return await _context.WarehouseLocations.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<WarehouseLocation> GetWarehouseLocationByName(string name)
        {
            return await _context.WarehouseLocations.SingleOrDefaultAsync(x => x.LocationName == name);
        }

        public async Task<IEnumerable<WarehouseLocation>> GetWarehouseLocations()
        {
            return await _context.WarehouseLocations.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateWarehouseLocation(WarehouseLocation warehouseLocation)
        {
            _context.Entry(warehouseLocation).State = EntityState.Modified;
        }
    }
}