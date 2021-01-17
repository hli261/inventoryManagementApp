namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public string Email { get; set; } //delete

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Password { get; set; }

        public bool Active { get; set; }
    }
}