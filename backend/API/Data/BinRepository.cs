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
            var bins = await _context.Bins
                .Include(b => b.BinType)
                .Include(w => w.WarehouseLocation)
                .ToListAsync();

            return bins;
        }

        public async Task<PagedList<BinDto>> GetBinsByParams(BinParams binParams)
        {
            try
            {
                var query = _context.Bins.AsQueryable();

                var result = new List<Bin>();

                if (binParams.MinCode != null)
                {
                    if (binParams.MaxCode == null)
                    {
                        query = query.Where(b => b.BinCode == binParams.MinCode);
                    }
                    else
                    {
                        query = query.Where(b => String.Compare(b.BinCode, binParams.MinCode) == 1 && String.Compare(b.BinCode, binParams.MaxCode) == -1);
                    }
                }


                if (binParams.TypeName != null)
                {
                    char[] delimiter = { ',', ';' };
                    string[] typeNames = binParams.TypeName.Split(delimiter);
                    // string[] typeNames = binParams.TypeName.Split(',');

                    

                    if (typeNames.Count() == 1)
                    {
                        query = query.Where(b => b.BinType.TypeName == typeNames[0]);
                    }
                    if (typeNames.Count() == 2)
                    {
                        query = query.Where(b => b.BinType.TypeName == typeNames[0] || b.BinType.TypeName == typeNames[1]);
                    }
                    if (typeNames.Count() == 3)
                    {
                        query = query.Where(b => b.BinType.TypeName == typeNames[0] || b.BinType.TypeName == typeNames[1] || b.BinType.TypeName == typeNames[2]);
                    }

                }


                if (binParams.LocationName != null)
                {
                    query = query.Where(b => b.WarehouseLocation.LocationName == binParams.LocationName);
                }

                // return await query.ProjectTo<BinDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
                var bins = await PagedList<BinDto>.CreateAsync(
                    query.ProjectTo<BinDto>(_mapper.ConfigurationProvider).OrderBy(m => m.BinCode).AsNoTracking(),
                    binParams.pageNumber,
                    binParams.PageSize
                );


                return bins;
            }
            catch
            {
                return null;
            }

        }

        public async Task<IEnumerable<Bin>> GetBinsByTypeId(int id)
        {
            var bins = await _context.Bins
                .Include(b => b.BinType)
                .Include(w => w.WarehouseLocation)
                .Where(b => b.BinTypeId == id).OrderBy(m => m.BinCode).ToListAsync();

            return bins;

        }

        public async Task<IEnumerable<Bin>> GetBinsByType(string type)
        {
            var bins = await _context.Bins
                .Include(b => b.BinType)
                .Include(w => w.WarehouseLocation)
                .Where(x => x.BinType.TypeName == type)
                .OrderBy(m => m.BinCode)
                .ToListAsync();

            return bins;
        }

        public async Task<IEnumerable<Bin>> GetBinsByWarehouseLocationId(int id)
        {
            var bins = await _context.Bins
                .Include(b => b.BinType)
                .Include(w => w.WarehouseLocation)
                .Where(x => x.WarehouseLocationId == id)
                .OrderBy(m => m.BinCode)
                .ToListAsync();

            return bins;
        }


        public async Task<IEnumerable<Bin>> GetBinsByWarehouse(string warehouse)
        {
            var bins = await _context.Bins
                .Include(b => b.BinType)
                .Include(w => w.WarehouseLocation)
                .Where(x => x.WarehouseLocation.LocationName == warehouse)
                .OrderBy(m => m.BinCode)
                .ToListAsync();

            return bins;

        }

        public async Task<Bin> GetBinByCode(string code)
        {

            var bin = await _context.Bins
                .Include(i => i.BinItems)
                .ThenInclude(ii => ii.Item)
                .Include(b => b.BinType)
                .Include(w => w.WarehouseLocation)
                .Where(b => b.BinCode == code).FirstOrDefaultAsync();


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

        public void UpdateBinAsync(Bin bin)
        {
            _context.Entry(bin).State = EntityState.Modified;

        }

    }
}