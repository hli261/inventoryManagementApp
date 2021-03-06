using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ReceivingItemRepository : IReceivingItemRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ReceivingItemRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void AddReceivingItemAsync(ReceivingItem receivingItem)
        {
            _context.ReceivingItems.Add(receivingItem);
        }

        public async Task<IEnumerable<ReceivingItem>> GetReceivingItemsByLOTAsync(string lotNum)
        {
            return await _context.ReceivingItems
            // .Include(i => i.Item)
            .Where(p => p.LotNumber.ToUpper() == lotNum.ToUpper())
            .ToListAsync();
        }

        public async Task<PagedList<ReceivingItem>> GetReceivingItemParamByROAsync(string roNum, PagingParams receivingItemParams)
        {
            var query = _context.ReceivingItems
           // .Include(i => i.Item)
           .Where(p => p.Receiving.RONumber.ToUpper() == roNum.ToUpper())
           .AsNoTracking();

            return await PagedList<ReceivingItem>.CreateAsync(query, receivingItemParams.pageNumber, receivingItemParams.PageSize);
        }
        public async Task<IEnumerable<ReceivingItem>> GetReceivingItemsByROAsync(string roNum)
        {
            return await _context.ReceivingItems
            // .Include(i => i.Item)
            .Where(p => p.Receiving.RONumber.ToUpper() == roNum.ToUpper())
            .ToListAsync();
        }

        public async Task<ReceivingItem> GetReceivingItemInReceivingByItemNumberAsync(string roNum, string itemNumber)
        {
            return await _context.ReceivingItems.Where(x => x.Receiving.RONumber.ToUpper() == roNum.ToUpper())
            .FirstOrDefaultAsync(i => i.ItemNumber.ToUpper() == itemNumber.ToUpper());
        }

        public void UpdateReceivingItem(ReceivingItem receivingItem)
        {
            _context.Entry(receivingItem).State = EntityState.Modified;

        }

        public async Task<bool> ItemExist(string number)
        {
            return await _context.ReceivingItems.AnyAsync(i => i.ItemNumber == number);
        }
        
        public void DeleteReceivingItems(IEnumerable<ReceivingItem> receivingItems)
        {
            foreach (ReceivingItem item in receivingItems)
            {
                _context.ReceivingItems.Remove(item);
            }
        }

    }
}