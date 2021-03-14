using System;
using API.Entities;

namespace API.DTOs
{
    public class GetReceivingItemDto
    {
        public string LotNumber { get; set; }
        public string ItemNumber { get; set; }
        public string ItemDescription { get; set; }
        // public Item Item { get; set; }

        public int OrderQty { get; set; }
        public int ReceiveQty { get; set; }
        public int DiffQty { get; set; }


        public DateTime ExpireDate { get; set; }
    }
}