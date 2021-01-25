using API.Entities;

namespace API.DTOs
{
    public class BinItemDto
    {
        public int Id { get; set; }
        
        public Bin Bin { get; set; }
        public Item Item { get; set; }

        public int Quantity { get; set; }
    }
}