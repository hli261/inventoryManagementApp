namespace API.Entities
{
    public class BinItem
    {
        public int Id { get; set; }
        
        public Bin bin { get; set; }
        public Item item { get; set; }

        public int quantity { get; set; }
    }
}