using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class BinDto
    {
        public int Id {get; set;}
        public string BinReference { get; set; }
        public string BinCode { get; set; }

        public BinType BinType { get; set; }

        public int BinTypeId { get; set; }

        public WarehouseLocation WarehouseLocation { get; set; }

        public int WarehouseLocationId { get; set; }

        public string Creator { get; set; }

        public DateTime CreateTime { get; set; } = DateTime.UtcNow;

        public ICollection<BinItem> BinItems { get; set; }

    }
}