using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CreateBinItemDto
    {
        // public Bin Bin { get; set; }
        // public Item Item { get; set; }

        public int Quantity { get; set; }

        
        public string BinCode { get; set; }

        public string ItemNumber { get; set; }    

        public string LotNumber { get; set; } 

        //public IEnumerable<GetReceivingItemDto> GetReceivingItemDtos { get; set; }
    }
}