using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ShippingRepository : IShippingRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ShippingRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<Shipping>> GetShippingsAsync()
        {
            return await _context.Shippings
                .Include(v => v.Vender)
                .Include(u => u.User)
                .Include(l => l.ShippingLot)
                .ToListAsync();
        }

        public async Task<Shipping> GetShippingById(int id)
        {
            // return await _context.Shippings.FindAsync(id);
            return await _context.Shippings
                .Include(v => v.Vender)
                .Include(u => u.User)
                .Include(l => l.ShippingLot)
                .Where(i => i.Id == id)
                .FirstOrDefaultAsync();
        }

        public void AddShippingAsync(Shipping shipping)
        {
            _context.Shippings.Add(shipping);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public int LotCountAsync()
        {
            return  _context.ShippingLots.Count();
        }

        public async Task<bool> ExistAsync(string shippingNum)
        {
            return await _context.Shippings.AnyAsync(x => x.Id.ToString() == shippingNum);
        }

        public void CreateShippingLot(ShippingLot lot)
        {
            _context.ShippingLots.Add(lot);
        }

        public void UpdateShipping(Shipping shipping)
        {
            _context.Entry(shipping).State = EntityState.Modified;

        }

        public async Task<ShippingLot> GetShippingLotById(int id)
        {
            return await _context.ShippingLots.FindAsync(id);
        }

        public void DeleteShipping(Shipping shipping)
        {
            _context.Shippings.Remove(shipping);
        }
    }
}