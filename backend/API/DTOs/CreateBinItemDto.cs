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
    }
}