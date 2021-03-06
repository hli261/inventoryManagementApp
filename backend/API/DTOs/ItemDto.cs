using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ItemDto
    {
        public int Id { get; set; }

        public string ItemNumber { get; set; }

        public string ItemDescription { get; set; }

        public double ItemPrice { get; set; }

        public string UpcCode { get; set; }

        public string ItemStatus { get; set; }

        public string UnitOfMeasure { get; set; }
        
        public int UomUnit { get; set; }
        public string FDA { get; set; }

        public ICollection<BinItem> BinItems { get; set; }

    }
}