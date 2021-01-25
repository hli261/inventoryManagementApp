using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class BinTypeRepository : IBinTypeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public BinTypeRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        
        public void AddBinType(BinType binType)
        {
            _context.BinTypes.Add(binType);
        }

        public void DeleteBinType(BinType binType)
        {
            _context.BinTypes.Remove(binType);
        }

        public async Task<BinType> GetBinTypeById(int id)
        {
            return await _context.BinTypes.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<BinType>> GetBinTypes()
        {
            return await _context.BinTypes.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
             return await _context.SaveChangesAsync() > 0;
        }

        public void UpdateBinType(BinType binType)
        {
             _context.Entry(binType).State = EntityState.Modified;
        }
    }
}