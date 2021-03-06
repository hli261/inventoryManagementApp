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
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ItemRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddItem(Item item)
        {
            _context.Items.Add(item);
        }

        public void DeleteItem(Item item)
        {
            _context.Items.Remove(item);
        }

        public async Task<Item> GetItemById(int id)
        {
            return await _context.Items.Include(bi => bi.BinItems).SingleOrDefaultAsync(x => x.Id == id);
        }

         public async Task<Item> GetItemByNumber(string number)
        {
            return await _context.Items.Include(bi => bi.BinItems).SingleOrDefaultAsync(x => x.ItemNumber.ToUpper() == number.ToUpper());
        }

        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }
//in test
        public async Task<PagedList<Item>> GetItemsAsync(PagingParams itemParams)
        {
            var query = _context.Items.ProjectTo<Item>(_mapper.ConfigurationProvider).AsNoTracking();

            return await PagedList<Item>.CreateAsync(query, itemParams.pageNumber, itemParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateItem(Item item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }
    }
}