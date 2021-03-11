using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Shipping
    {
        public int Id { get; set; }
        public string ShippingNumber { get; set; }
        public DateTime ArrivalDate { get; set; } = DateTime.UtcNow;
        public string InvoiceNumber { get; set; }

        public ShippingMethod ShippingMethod { get; set; }
        public int ShippingMethodId { get; set; }

        public Vender Vender { get; set; }
        public int VenderId { get; set; }

        public AppUser User { get; set; }
        public int UserId { get; set; }

        public ShippingLot ShippingLot { get; set; }
        public int ShippingLotId { get; set; }

        public string PONumber { get; set; }
    }
}