using System.ComponentModel.DataAnnotations;
using System.Linq;
using API.Data;

namespace API.Helpers
{
    public class BinCodeUniqueAttribute : ValidationAttribute
    {
         protected override ValidationResult IsValid(
            object value, ValidationContext validationContext)
        {
            var _context = (DataContext)validationContext.GetService(typeof(DataContext));
            var entity = _context.Bins.FirstOrDefault(e => e.BinCode == value.ToString());

            if (entity != null)
            {
                return new ValidationResult(GetErrorMessage(value.ToString()));
            }
            return ValidationResult.Success;
        }

        public string GetErrorMessage(string binCode)
        {
            return $"Bin code {binCode} is already in use.";
        }
    }
}