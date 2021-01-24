using System.Collections.Generic;

namespace API.Entities
{
    public class Item
    {
        public int Id { get; set; }

        public string ItemName { get; set; }

        public string ItemNumber { get; set; }

        public string Description { get; set; }

        public ICollection<BinItem> BinItems { get; set; }
    }
}