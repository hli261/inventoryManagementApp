using System;

namespace API.DTOs
{
    public class ROitemsDto
    {
        public string LotNumber { get; set; }
        public string ItemNumber { get; set; }
        public string ItemDescription { get; set; }
        public int OrderQty { get; set; }
        public int ReceiveQty { get; set; }
        public int DiffQty { get; set; }
        public DateTime ExpireDate { get; set; }
        
    }
}