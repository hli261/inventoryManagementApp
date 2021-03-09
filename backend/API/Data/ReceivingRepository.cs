using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

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

    }
}