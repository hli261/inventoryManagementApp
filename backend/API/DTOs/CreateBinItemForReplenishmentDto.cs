namespace API.DTOs
{
    public class CreateBinItemForReplenishmentDto
    {
        public int Quantity { get; set; }
  
        public string FromBinCode { get; set; }

        public string DestinationBinCode { get; set; }

        public string ItemNumber { get; set; }    

        public string LotNumber { get; set; } 
    }
}