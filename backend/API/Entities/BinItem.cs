namespace API.Entities
{
    public class BinItem
    {
        public int Id { get; set; }
        
        public Bin Bin { get; set; }
        public Item Item { get; set; }

        public int Quantity { get; set; }
    }
}