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
    public class ReceivingRepository : IReceivingRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ReceivingRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public int CountAsync()
        {
            return _context.Receivings.Count();
        }

        public void AddReceivingAsync(Receiving receiving)
        {
            _context.Receivings.Add(receiving);
        }
        public async Task<Receiving> GetReceivingByROAsync(string roNumber)
        {
            return await _context.Receivings
            .Include(i => i.ReceivingItems) //check functions
            .FirstOrDefaultAsync(x => x.RONumber.ToUpper() == roNumber.ToUpper());
        }

        public async Task<Receiving> GetReceivingByLotAsync(string lotNum)
        {
            return await _context.Receivings
            .Include(i => i.ReceivingItems) //check functions
            .FirstOrDefaultAsync(x => x.LotNumber.ToUpper() == lotNum.ToUpper());
        }

        public void UpdateReceiving(Receiving receiving)
        {
            _context.Entry(receiving).State = EntityState.Modified;

        }

        public async Task<bool> ROExist(string roNo)
        {
            return await _context.Receivings.AnyAsync(x => x.RONumber == roNo);
        }

        public async Task<PagedList<Receiving>> GetReceivingsAsync(PagingParams receivingParams)
        {
            var query = _context.Receivings
               .Include(v => v.ReceivingItems)
                // .ThenInclude(i => i.Item)
                .AsNoTracking();

            return await PagedList<Receiving>.CreateAsync(query, receivingParams.pageNumber, receivingParams.PageSize);
        }

        public async Task<PagedList<Receiving>> GetReceivingByStatusAsync(string status, PagingParams receivingParams)
        {
            var query = _context.Receivings
                .Include(v => v.ReceivingItems)
                .Where(x => x.Status.ToUpper() == status.ToUpper())
                // .ThenInclude(i => i.Item)
                .AsNoTracking();
            return await PagedList<Receiving>.CreateAsync(query, receivingParams.pageNumber, receivingParams.PageSize);
        }

        public void DeleteReceiving(Receiving receiving)
        {
            _context.Receivings.Remove(receiving);
        }

    }
}