using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class GetReceivingHeaderDto
    {

        public string RONumber { get; set; }
        //
        public string PONumber { get; set; }
        public string ShippingNumber { get; set; }
        public string LotNumber { get; set; }
        public string VenderNo { get; set; }
        public string UserEmail { get; set; }
        //
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "DRAFT";
        //"SAVE" "SUBMIT"
        public DateTime OrderDate { get; set; }

        public IEnumerable<GetReceivingItemDto> GetReceivingItemDtos { get; set; }

    }
}