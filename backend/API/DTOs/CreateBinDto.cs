using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;
using API.Helpers;

namespace API.DTOs
{
    [Table("BinDto")]
    public class CreateBinDto
    {
        public string BinReference { get; set; }

        [Required]
        [BinCodeUnique]
        public string BinCode { get; set; }

        // public string TypeName { get; set; }

        // public string LocationName { get; set; }

       
        //public BinType BinType { get; set; }

        public int BinTypeId { get; set; }

        //public WarehouseLocation WarehouseLocation { get; set; }

        public int WarehouseLocationId { get; set; }
    }
}