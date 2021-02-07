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
            var bins = await _context.Bins.ToListAsync();

            foreach(Bin bin in bins){
               bin.BinType = await GetBinTypeById(bin.BinTypeId);
               bin.WarehouseLocation = await GetWarehouseLocationById(bin.WarehouseLocationId);
            }

            return bins;
        }

        // public async Task<PagedList<Bin>> GetBinsAsync(PagingParams binParams)
        // {
        //     var query = _context.Bins.ProjectTo<Bin>(_mapper.ConfigurationProvider).AsNoTracking();

        //     return await PagedList<Bin>.CreateAsync(query, binParams.pageNumber, binParams.PageSize);
        // }

        public async Task<PagedList<BinDto>> GetBinsByParams(BinParams binParams)
        {
            var query = _context.Bins.AsQueryable();

            // if (binParams.WarehouseLocationId != null)
            // {
            //     query = query.Where(b => b.WarehouseLocationId == binParams.WarehouseLocationId);
            // }
            // if (binParams.BinTypeId != null)
            // {
            //     query = query.Where(b => b.BinTypeId == binParams.BinTypeId);
            // }
            if (binParams.LocationName != null)
            {
                query = query.Where(b => b.WarehouseLocation.LocationName == binParams.LocationName);
            }
            if (binParams.TypeName != null)
            {
                query = query.Where(b => b.BinType.TypeName == binParams.TypeName);
            }
            if (binParams.MinCode != null)
            {
                if(binParams.MaxCode == null)
                {
                    query = query.Where(b => b.BinCode == binParams.MinCode);
                }
                else{
                    query = query.Where(b => String.Compare(b.BinCode, binParams.MinCode) == 1 && String.Compare(b.BinCode, binParams.MaxCode) == -1);
                }      
            }

            // return await query.ProjectTo<BinDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
            var bins = await PagedList<BinDto>.CreateAsync(
                query.ProjectTo<BinDto>(_mapper.ConfigurationProvider).AsNoTracking(),
                binParams.pageNumber,
                binParams.PageSize
            );

            foreach(BinDto bin in bins){
               bin.BinType = await GetBinTypeById(bin.BinTypeId);
               bin.WarehouseLocation = await GetWarehouseLocationById(bin.WarehouseLocationId);
            }

            return bins;
        }

        public async Task<IEnumerable<Bin>> GetBinsByTypeId(int id)
        {
            var bins = await _context.Bins.Where(b => b.BinTypeId == id).OrderBy(m => m.BinCode).ToListAsync();

            foreach(Bin bin in bins){
                bin.BinType = await GetBinTypeById(bin.BinTypeId);
                bin.WarehouseLocation = await GetWarehouseLocationById(bin.WarehouseLocationId);
            }

            return bins;

        }

        public async Task<IEnumerable<Bin>> GetBinsByType(string type)
        {
            var bins = await _context.Bins      
                .Where(x => x.BinType.TypeName == type)
                .OrderBy(m => m.BinCode)
                .ToListAsync();

            foreach(Bin bin in bins){
               bin.BinType = await GetBinTypeByName(type);
               bin.WarehouseLocation = await GetWarehouseLocationById(bin.WarehouseLocationId);
            }

            return bins;
        }

        public async Task<IEnumerable<Bin>> GetBinsByWarehouseLocationId(int id)
        {
            var bins = await _context.Bins
                            .Where(x => x.WarehouseLocationId == id)
                            .OrderBy(m => m.BinCode)
                            .ToListAsync();
            // return await _context.Bins
            //     // .Include(t => t.BinType)
            //     // .Include(w => w.WarehouseLocation)
            //     .Where(x => x.WarehouseLocationId == id)
            //     .OrderBy(m => m.BinCode)
            //     .ToListAsync();
           foreach(Bin bin in bins){
               bin.BinType = await GetBinTypeById(bin.BinTypeId);
               bin.WarehouseLocation = await GetWarehouseLocationById(bin.WarehouseLocationId);
           }

            return bins;
        }


        public async Task<IEnumerable<Bin>> GetBinsByWarehouse(string warehouse)
        {
            var bins = await _context.Bins
                .Where(x => x.WarehouseLocation.LocationName == warehouse)
                .OrderBy(m => m.BinCode)
                .ToListAsync();

            foreach(Bin bin in bins){
               bin.BinType = await GetBinTypeById(bin.BinTypeId);
               bin.WarehouseLocation = await GetWarehouseLocationByName(warehouse);
            }

            return bins;
            
        }

        public async Task<Bin> GetBinByCode(string code)
        {
            // return await _context.Bins.SingleOrDefaultAsync(x => x.BinCode == code);

            var bin = await _context.Bins.Where(b => b.BinCode == code).FirstOrDefaultAsync();

            bin.BinType = await GetBinTypeById(bin.BinTypeId);
            bin.WarehouseLocation = await GetWarehouseLocationById(bin.WarehouseLocationId);

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

        public async Task UpdateBinAsync(Bin bin)
        {
            _context.Entry(bin).State = EntityState.Modified;
            bin.BinType = await GetBinTypeById(bin.BinTypeId);
            bin.WarehouseLocation = await GetWarehouseLocationById(bin.WarehouseLocationId);
        }


        
        public async Task<BinType> GetBinTypeById(int id)
        {
            return await _context.BinTypes.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<WarehouseLocation> GetWarehouseLocationById(int id)
        {
            return await _context.WarehouseLocations.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<BinType> GetBinTypeByName(string name)
        {
            return await _context.BinTypes.SingleOrDefaultAsync(x => x.TypeName == name);
        }

        public async Task<WarehouseLocation> GetWarehouseLocationByName(string name)
        {
            return await _context.WarehouseLocations.SingleOrDefaultAsync(x => x.LocationName == name);
        }
    }
}