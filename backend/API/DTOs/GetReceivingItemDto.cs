using API.Entities;

namespace API.DTOs
{
    public class GetReceivingItemDto
    {
        public string PONumber { get; set; }
        public string ItemNumber { get; set; }
        public int OrderQty { get; set; }
        public string ItemDescription { get; set; }
    }
}