

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BinRepository : IBinRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BinRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddBin(Bin bin)
        {
            _context.Bins.Add(bin);
        }

        public void DeleteBin(Bin bin)
        {
            _context.Bins.Remove(bin);
        }

        public async Task<IEnumerable<Bin>> GetBins()
        {
           
           var result = await _context.Bins.OrderBy(b => b.BinCode).ToListAsync();
           return result;
            // return await _context.Bins
            //     //.Include(i => i.BinItems)
            //     .OrderBy(m => m.BinCode)
            //     .ToListAsync();
        }

        public async Task<IEnumerable<Bin>> GetBinsByType(string type)
        {
            return await _context.Bins
                .Include(i => i.BinItems)
                .Include(t => t.BinType)
                .Where(x => x.BinType.TypeName == type)
                .OrderBy(m => m.BinCode)
                .ToListAsync();
        }

        public async Task<IEnumerable<Bin>> GetBinsByWarehouse(string warehouse)
        {
            return await _context.Bins
                .Include(i => i.BinItems)
                .Include(l => l.WarehouseLocation)
                .Where(x => x.WarehouseLocation.LocationName == warehouse)
                .OrderBy(m => m.BinCode)
                .ToListAsync();
        }

        public async Task<Bin> GetBinByCode(string code)
        {
            return await _context.Bins
                .Include(i => i.BinItems)
                .SingleOrDefaultAsync(x => x.BinCode == code);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateBin(Bin bin)
        {
            _context.Entry(bin).State = EntityState.Modified;
        }
    }
}