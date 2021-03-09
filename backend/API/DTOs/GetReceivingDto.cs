using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class GetReceivingDto
    {
        public string PONumber { get; set; }
        // public IEnumerable<ERP_POitem> ERP_POitems { get; set; }
        public IEnumerable<GetReceivingItemDto> GetReceivingItemDtos { get; set; }

        public Shipping Shipping { get; set; }

        public DateTime OrderDate { get; set; }

    }
}