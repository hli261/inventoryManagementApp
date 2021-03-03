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

        Task<bool> SaveAllAsync();
        Task<ShippingMethod> GetShippingMethodbyName(string name);

        void CreateShippingMethod(ShippingMethod method);

        void deleteShippingMethod(ShippingMethod method);
        Task<bool> ShippingMethodExist(string method);
    }
}