using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CreateReceivingDto
    {
        //
        public string PONumber { get; set; }
        public string ShippingNumber { get; set; }
        public string LotNumber { get; set; }
        public string VenderNo { get; set; }
        public string UserEmail { get; set; }
        //
        public DateTime ArrivalDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "DRAFT";
        //"SAVE" "SUBMIT"
        public DateTime OrderDate { get; set; }

        
        public ROitemsDto ROitems { get; set; }
    }
}