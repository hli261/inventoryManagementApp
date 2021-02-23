using System.Collections.Generic;
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
            return await _context.Shippings.ToListAsync();
        }

        public void AddShippingAsync(Shipping shipping)
        {
            _context.Shippings.Add(shipping);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ExistAsync(string shippingNum)
        {
            return await _context.Shippings.AnyAsync(x => x.Id.ToString() == shippingNum);
        }
    }
}