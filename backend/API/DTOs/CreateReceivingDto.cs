using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CreateReceivingDto
    {
        public string PONumber { get; set; }
        public IEnumerable<ERP_POitem> ERP_POitems { get; set; }

        public int ReceiveQty { get; set; }

        public Shipping Shipping { get; set; }

        public DateTime OrderDate { get; set; }

        public string Status { get; set; }
    }
}