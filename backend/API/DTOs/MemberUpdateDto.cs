namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public int Id { get; set; }
        public string Email {get; set;}

        public string Firstname {get;set;}

        public string Lastname {get;set;}
        
        public string Password {get; set;}

        public bool Active {get; set;}
    }
}