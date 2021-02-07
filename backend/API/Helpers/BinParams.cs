namespace API.Helpers
{
    public class BinParams : PagingParams
    {

        //public string BinCode { get; set; }

        public string MinCode { get; set; }

        public string MaxCode { get; set;}
        
        // public int? BinTypeId { get; set; }

        // public int? WarehouseLocationId { get; set;}

        public string TypeName { get; set; }
        public string LocationName { get; set; }
    }
}