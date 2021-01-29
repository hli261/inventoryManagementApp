using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Bin
    {
        public int Id { get; set; }

        public string BinReference { get; set; }
        public string BinCode { get; set; }

        // public string BinType { get; set; }

        // public string Warehouse { get; set; }

        //public ICollection<BinItem> BinItems { get; set; }

        public string Creator { get; set; }

        public DateTime CreateTime { get; set; } = DateTime.UtcNow;

        public BinType BinType { get; set; }

        public int BinTypeId { get; set; }

        public WarehouseLocation WarehouseLocation { get; set; }

        public int WarehouseLocationId { get; set; }
    }
}