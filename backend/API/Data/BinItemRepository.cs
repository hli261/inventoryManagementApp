using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BinItemRepository : IBinItemRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BinItemRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddBinItem(BinItem binItem)
        {
            _context.BinItems.Add(binItem);
        }

        public void DeleteBinItem(BinItem binItem)
        {
            _context.BinItems.Remove(binItem);
        }

        public async Task<BinItem> GetBinItemById(int id)
        {
            return await _context.BinItems
                .Include(b => b.Bin)
                .Include(i => i.Item)
                .Include(s => s.ShippingLot)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<BinItem>> GetBinItems()
        {
            var binItems = await _context.BinItems
                .Include(b => b.Bin)
                .Include(i => i.Item)
                .Include(s => s.ShippingLot)
                .ToListAsync();
            return binItems;
        }

        public async Task<BinItem> GetBinItemByThree(string code, string number, string lot)
        {
            return await _context.BinItems.Include(b => b.Bin)
                .Include(i => i.Item)
                .Include(s => s.ShippingLot)
                .Where(b => b.Bin.BinCode == code)
                .Where(i => i.Item.ItemNumber == number)
                .FirstOrDefaultAsync(l => l.ShippingLot.LotNumber == lot);

        }

        public async Task<IEnumerable<BinItemQueryDto>> GetBinItemsByBinCode(string code)
        {
            try
            {
                var result = from binItem in await _context.BinItems.Include(b => b.Bin).Where(b => b.Bin.BinCode.ToUpper() == code.ToUpper()).Include(i => i.Item).Include(s => s.ShippingLot).ToListAsync()
                             select new BinItemQueryDto
                             {
                                 Id = binItem.Id,
                                 Quantity = binItem.Quantity,
                                 BinId = binItem.BinId,
                                 ItemId = binItem.ItemId,
                                 BinCode = binItem.Bin.BinCode,
                                 ItemNumber = binItem.Item.ItemNumber,
                                 ShippingLotId = binItem.ShippingLot.Id,
                                 LotNumber = binItem.ShippingLot.LotNumber,
                             };


                return result.ToList();

            }
            catch (Exception ex)
            {

                string msg = ex.Message;
                return null;
            }
        }

        public async Task<PagedList<BinItem>> GetBinItemsByBinCodePaging(string code, PagingParams binItemParams)
        {
            try
            {
                var result = _context.BinItems
                .Include(b => b.Bin)
                .Where(b => b.Bin.BinCode.ToUpper() == code.ToUpper())
                .Include(i => i.Item)
                .Include(s => s.ShippingLot)
                .AsNoTracking();


                return await PagedList<BinItem>.CreateAsync(result, binItemParams.pageNumber, binItemParams.PageSize);

            }
            catch (Exception ex)
            {

                string msg = ex.Message;
                return null;
            }
        }

        public async Task<IEnumerable<BinItemQueryDto>> GetBinItemsByItemNumber(string number)
        {
            try
            {
                var result = from binItem in await _context.BinItems.Include(s => s.ShippingLot).Include(b => b.Bin).Include(i => i.Item).Where(b => b.Item.ItemNumber.ToUpper() == number.ToUpper()).ToListAsync()
                             select new BinItemQueryDto
                             {
                                 Id = binItem.Id,
                                 Quantity = binItem.Quantity,
                                 BinId = binItem.BinId,
                                 ItemId = binItem.ItemId,
                                 BinCode = binItem.Bin.BinCode,
                                 ItemNumber = binItem.Item.ItemNumber,
                                 ShippingLotId = binItem.ShippingLot.Id,
                                 LotNumber = binItem.ShippingLot.LotNumber,
                             };


                return result.ToList();

            }
            catch (Exception ex)
            {

                string msg = ex.Message;
                return null;
            }
        }

        public async Task<PagedList<BinItem>> GetBinItemsAsync(PagingParams binItemParams)
        {
            var query = _context.BinItems
                .Include(b => b.Bin)
                .Include(i => i.Item).ProjectTo<BinItem>(_mapper.ConfigurationProvider).AsNoTracking();

            return await PagedList<BinItem>.CreateAsync(query, binItemParams.pageNumber, binItemParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateBinItemAsync(BinItem binItem)
        {
            _context.Entry(binItem).State = EntityState.Modified;
        }

    }
}