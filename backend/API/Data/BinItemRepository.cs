using System.Collections.Generic;
using System.Threading.Tasks;
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
                // .Include(b => b.Bin)
                // .Include(i => i.Item)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<BinItem>> GetBinItems()
        {
            return await _context.BinItems
                // .Include(b => b.Bin)
                // .Include(i => i.Item)
                .ToListAsync();
        }
//in testing
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

        public void UpdateBinItem(BinItem binItem)
        {
            _context.Entry(binItem).State = EntityState.Modified;
        }
    }
}