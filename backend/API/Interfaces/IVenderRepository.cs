using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IVenderRepository
    {
        Task<IEnumerable<ShippingMethod>> GetShippingMethods();

        Task<bool> VenderExist(string venderNo);

        Task<Vender> GetVenderByNumber(string vNumber);
    }
}