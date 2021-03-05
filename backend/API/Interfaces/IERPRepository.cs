using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IERPRepository
    {
        Task<ERP_POheader> GetReceivingByPO(string poNum);
        Task<IEnumerable<ERP_POitem>> GetReceivingItemByPO(string poNum);
    }
}