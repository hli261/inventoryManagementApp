using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ShippingDto
    {
        public DateTime ArrivalDate { get; set; } = DateTime.UtcNow;
        public string InvoiceNumber { get; set; } = null;
        public string LogisticName { get; set; }
        public string VenderNo { get; set; }
        public string UserEmail { get; set; }
        public string PONumber { get; set; }
    }
}