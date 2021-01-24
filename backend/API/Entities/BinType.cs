using System.Collections.Generic;

namespace API.Entities
{
    public class BinType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }

        public ICollection<Bin> Bins { get; set; }
    }
}