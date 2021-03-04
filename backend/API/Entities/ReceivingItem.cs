using System;

namespace API.Entities
{
    public class ReceivingItem
    {
        public int Id { get; set; }
        public int OrderQty { get; set; }
        public int ReceiveQty { get; set; }
        public int DiffQty { get; set; }

        public DateTime ExpireDate {get;set;}


    }
}