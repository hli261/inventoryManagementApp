using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Receiving
    {
        public int Id { get; set; }
        public Shipping Shipping { get; set; }
        // public DateTime ReceiveDate { get; set; } = DateTime.UtcNow;
        // public AppUser Receiver { get; set; }
        public string Status { get; set; }

        public string ROnumber { get; set; }

        public ICollection<ReceivingItem> ReceivingItems { get; set; }
    }
}