using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        [Required]
        public string Username {get; set;}

        [Required]
        public string Firstname {get;set;}

        [Required]
        public string Lastname {get;set;}
        
        [Required]
        public string Password {get; set;}
    }
}