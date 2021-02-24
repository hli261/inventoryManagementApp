using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Shipping
    {
        public int Id { get; set; }
        public DateTime ArrivalDate { get; set; } = DateTime.UtcNow;
        public string InvoiceNumber { get; set; }
        public string ShippingMethod { get; set; }
        public Vender Vender { get; set; }
        public AppUser User { get; set; }
        public ShippingLot ShippingLot { get; set; }
    }
}