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

<<<<<<< HEAD
        public async Task<IEnumerable<ReceivingItem>> GetReceivingItemsByLOTAsync(string lotNum)
=======
        public async Task<IEnumerable<ReceivingItem>> GetReceivingItemsByLotAsync(string lotNum)
>>>>>>> 9f7fbc5e07ac5a1a76c7ba901fe885694082c95d
        {
            return await _context.ReceivingItems
            .Include(i => i.Item)
            .Where(p => p.LotNumber.ToUpper() == lotNum.ToUpper())
<<<<<<< HEAD
=======
            .ToListAsync();
        }

        public async Task<IEnumerable<ReceivingItem>> GetReceivingItemsByROAsync(string roNum)
        {
            return await _context.ReceivingItems
            .Include(i => i.Item)
            .Where(p => p.Receiving.ROnumber.ToUpper() == roNum.ToUpper())
>>>>>>> 9f7fbc5e07ac5a1a76c7ba901fe885694082c95d
            .ToListAsync();
        }
    }
}