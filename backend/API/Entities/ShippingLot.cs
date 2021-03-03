using System;

namespace API.Entities
{
    public class ShippingLot
    {
        public int Id { get; set; }
        public string LotNumber { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;
    }
}