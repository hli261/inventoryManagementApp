using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ShippingLotDto
    {
        
        public int Id { get; set; }
        public string LotNumber { get; set; }
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;
    }
}