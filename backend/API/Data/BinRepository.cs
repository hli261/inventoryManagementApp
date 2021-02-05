using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using API.DTOs;

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
            var result = await _context.Bins.ToListAsync();

            return result;
        }

        public async Task<PagedList<Bin>> GetBinsAsync(PagingParams binParams)
        {
            var query = _context.Bins.ProjectTo<Bin>(_mapper.ConfigurationProvider).AsNoTracking();

            return await PagedList<Bin>.CreateAsync(query, binParams.pageNumber, binParams.PageSize);
        }

        public async Task<IEnumerable<BinDto>> GetBinsByParams(BinParams binParams)
        {
            var query = _context.Bins.AsQueryable();

            if (binParams.WarehouseLocationId != null)
            {
                query = query.Where(b => b.WarehouseLocationId == binParams.WarehouseLocationId);
            }
            if (binParams.BinTypeId != null)
            {
                query = query.Where(b => b.BinTypeId == binParams.BinTypeId);
            }
            if (binParams.MinCode != null && binParams.MaxCode != null)
            {
                query = query.Where(b => String.Compare(b.BinCode, binParams.MinCode) == 1 && String.Compare(b.BinCode, binParams.MaxCode) == -1);
            }

            return await query.ProjectTo<BinDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Bin>> GetBinsByTypeId(int id)
        {

            //    var result = await _context.Bins.Where(b => b.BinTypeId == id)
            //         .Include(t => t.BinType)
            //         .Include(w => w.WarehouseLocation)
            //         .OrderBy(b => b.BinCode)
            //         .ToListAsync();
            var result = await _context.Bins.Where(b => b.BinTypeId == id).ToListAsync();

            return result;

        }

        public async Task<IEnumerable<Bin>> GetBinsByType(string type)
        {
            return await _context.Bins
                // .Include(t => t.BinType)
                // .Include(w => w.WarehouseLocation)
                .Where(x => x.BinType.TypeName == type)
                .OrderBy(m => m.BinCode)
                .ToListAsync();
        }

        public async Task<IEnumerable<Bin>> GetBinsByWarehouseLocationId(int id)
        {
            return await _context.Bins
                // .Include(t => t.BinType)
                // .Include(w => w.WarehouseLocation)
                .Where(x => x.WarehouseLocationId == id)
                .OrderBy(m => m.BinCode)
                .ToListAsync();
        }

        public async Task<IEnumerable<Bin>> GetBinsByWarehouse(string warehouse)
        {
            return await _context.Bins
                // .Include(t => t.BinType)
                // .Include(w => w.WarehouseLocation)
                .Where(x => x.WarehouseLocation.LocationName == warehouse)
                .OrderBy(m => m.BinCode)
                .ToListAsync();
        }

        public async Task<Bin> GetBinByCode(string code)
        {
            // return await _context.Bins.SingleOrDefaultAsync(x => x.BinCode == code);

            var bin = await _context.Bins.Where(b => b.BinCode == code).FirstOrDefaultAsync();
            if (bin == null)
            {
                return null;
            }
            return bin;
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