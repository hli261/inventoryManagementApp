using System.ComponentModel.DataAnnotations;
using API.Helpers;

namespace API.DTOs
{
    public class UpdateBinDto
    {
         public string BinReference { get; set; }

        [Required]
        public string BinCode { get; set; }

        public string TypeName { get; set; }

        public string LocationName { get; set; }
    }
}