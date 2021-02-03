

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
            var result = await _context.Bins
                 .Include(t => t.BinType)
                 .Include(w => w.WarehouseLocation)
                 .OrderBy(b => b.BinCode)
                 .ToListAsync();

            return result;
        }

        public async Task<PagedList<Bin>> GetBinsAsync(PagingParams binParams)
        {
            var query = _context.Bins
                 .Include(t => t.BinType)
                 .Include(w => w.WarehouseLocation)
                 .OrderBy(b => b.BinCode).ProjectTo<Bin>(_mapper.ConfigurationProvider).AsNoTracking();

            return await PagedList<Bin>.CreateAsync(query, binParams.pageNumber, binParams.PageSize);
        }

        public async Task<IEnumerable<Bin>> GetBinsByType(string type)
        {
            return await _context.Bins
                .Include(t => t.BinType)
                .Include(w => w.WarehouseLocation)
                .Where(x => x.BinType.TypeName == type)
                .OrderBy(m => m.BinCode)
                .ToListAsync();
        }

        public async Task<IEnumerable<Bin>> GetBinsByWarehouse(string warehouse)
        {
            return await _context.Bins
                .Include(t => t.BinType)
                .Include(w => w.WarehouseLocation)
                .Where(x => x.WarehouseLocation.LocationName == warehouse)
                .OrderBy(m => m.BinCode)
                .ToListAsync();
        }

        public async Task<Bin> GetBinByCode(string code)
        {
            return await _context.Bins
                .Include(t => t.BinType)
                .Include(w => w.WarehouseLocation)
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