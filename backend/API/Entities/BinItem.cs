namespace API.Entities
{
    public class BinItem
    {
        public int Id { get; set; }
        
        public Bin Bin { get; set; }

        public int BinId { get; set;}

        public int ItemId { get; set; }
        public Item Item { get; set; }

        public int Quantity { get; set; }

        public ShippingLot ShippingLot { get; set; }
        public int ShippingLotId { get; set; }

        
        //public string BinCode { get; set; }

        //public string ItemNumber { get; set; }     
    }
}