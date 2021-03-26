namespace API.DTOs
{
    public class CreateBinItemForPutawayDto
    {
         // public Bin Bin { get; set; }
        // public Item Item { get; set; }

        public int Quantity { get; set; }
  
        public string FromBinCode { get; set; }

        public string DestinationBinCode { get; set; }

        public string ItemNumber { get; set; }    

        public string LotNumber { get; set; } 
    }
}