using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IShippingRepository
    {
        void AddShippingAsync(Shipping shipping);

        // void DeleteItem(Item item);

        // void UpdateItem(Item item);

        // Task<IEnumerable<Item>> GetItems();
        // Task<PagedList<Item>> GetItemsAsync(PagingParams itemParams); //paging

        // Task<Item> GetItemByNumber(string number);
        Task<PagedList<Shipping>> GetShippingsAsync(ShippingParams shippingParams);
        // Task<IEnumerable<Shipping>> GetShippingsAsync();
        Task<Shipping> GetShippingById(int id);
        Task<bool> SaveAllAsync();

        Task<bool> ExistAsync(string shippingNum);
        void DeleteShipping(Shipping shipping);
        void CreateShippingLot(ShippingLot lot);
        void UpdateShipping(Shipping shipping);
        Task<ShippingLot> GetShippingLotById(int id);
        Task<ShippingLot> GetShippingLotByNumber(string number);
        int LotCountAsync();
        Task<Shipping> GetShippingByNumber(string spNum);
        Task<PagedList<Shipping>> GetShippingByVenderAsync(string venderNo, PagingParams receivingParams);
    }
}