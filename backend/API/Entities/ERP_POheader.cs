using System;

namespace API.Entities
{
    public class ERP_POheader
    {
        public int Id { get; set; }
        public string PONumber { get; set; }
        public string VendorNo { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime DateRequired { get; set; }
        public int WhseLocation { get; set; }
    }
}