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
    public class ShippingRepository : IShippingRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ShippingRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<PagedList<Shipping>> GetShippingsAsync(PagingParams shippingParams)
        {
            var query = _context.Shippings
                .Include(v => v.Vender)
                .Include(u => u.User)
                .Include(l => l.ShippingLot)
                .Include(m => m.ShippingMethod)
                .AsNoTracking();
            return await PagedList<Shipping>.CreateAsync(query, shippingParams.pageNumber, shippingParams.PageSize);
        }

        public async Task<Shipping> GetShippingById(int id)
        {
            // return await _context.Shippings.FindAsync(id);
            return await _context.Shippings
                .Include(v => v.Vender)
                .Include(u => u.User)
                .Include(l => l.ShippingLot)
                .Include(m => m.ShippingMethod)
                .Where(i => i.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Shipping> GetShippingByNumber(string spNum)
        {
            // return await _context.Shippings.FindAsync(id);
            return await _context.Shippings
                .Include(v => v.Vender)
                .Include(u => u.User)
                .Include(l => l.ShippingLot)
                .Include(m => m.ShippingMethod)
                .Where(i => i.ShippingNumber.ToUpper() == spNum.ToUpper())
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
            return _context.ShippingLots.Count();
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

        public async Task<ShippingLot> GetShippingLotByNumber(string number)
        {
            return await _context.ShippingLots.SingleOrDefaultAsync(x => x.LotNumber.ToUpper() == number.ToUpper());
        }

        public void DeleteShipping(Shipping shipping)
        {
            _context.Shippings.Remove(shipping);
        }

        public async Task<PagedList<Shipping>> GetShippingByVenderAsync(string venderNo, PagingParams receivingParams)
        {
            var query = _context.Shippings
                .Include(v => v.Vender)
                .Include(u => u.User)
                .Include(l => l.ShippingLot)
                .Include(m => m.ShippingMethod)
                .Where(i => i.Vender.VenderNo.ToUpper() == venderNo.ToUpper())
                .AsNoTracking();
            return await PagedList<Shipping>.CreateAsync(query, receivingParams.pageNumber, receivingParams.PageSize);
        }
    }
}