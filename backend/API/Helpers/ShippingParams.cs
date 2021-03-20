using System;

namespace API.Helpers
{
    public class ShippingParams : PagingParams
    {
        public DateTime fromTimeRange { get; set; }
        public DateTime toTimeRange { get; set; }
    }
}