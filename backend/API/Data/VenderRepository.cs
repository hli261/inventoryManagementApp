using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace API.Data
{
    public class VenderRepository : IVenderRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public VenderRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<IEnumerable<ShippingMethod>> GetShippingMethods()
        {
            return await _context.ShippingMethods.ToListAsync();
        }

        public async Task<bool> VenderExist(string venderNo)
        {
            return await _context.Venders.AnyAsync(x => x.VenderNo == venderNo);
        }

        public async Task<Vender> GetVenderByNumber(string vNumber)
        {
            return await _context.Venders.FirstOrDefaultAsync(x => x.VenderNo == vNumber.ToUpper());
        }
    }
}