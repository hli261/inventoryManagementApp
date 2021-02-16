using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class UpdateBinDto
    {
         public string BinReference { get; set; }

        [Required]
        public string BinCode { get; set; }

        public string BinTypeName { get; set; }

        public string WarehouseLocationName { get; set; }
    }
}