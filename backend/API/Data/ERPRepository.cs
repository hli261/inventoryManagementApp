using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ERPRepository : IERPRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ERPRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ERP_POheader> GetReceivingByPO(string poNum)
        {
            var bins = await _context.ERP_POheaders.SingleOrDefaultAsync(x => x.PONumber.ToUpper() == poNum.ToUpper());

            return bins;
        }

        public async Task<IEnumerable<ERP_POitem>> GetReceivingItemByPO(string poNum)
        {
            var po = await _context.ERP_POitems
                .Where(x => x.PONumber.ToUpper() == poNum.ToUpper())
                .OrderBy(m => m.ItemNumber)
                .ToListAsync();
            return po;
        }

    }
}