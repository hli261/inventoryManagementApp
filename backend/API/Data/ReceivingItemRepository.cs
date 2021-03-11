using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
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
            .Include(i => i.Item)
            .Where(p => p.LotNumber.ToUpper() == lotNum.ToUpper())
            .ToListAsync();
        }
    }
}