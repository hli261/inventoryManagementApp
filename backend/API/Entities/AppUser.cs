using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser: IdentityUser<int>
    {  
        public string FirstName {get; set;}

        public string LastName {get; set;}
        
        public bool Active { get; set; }

        public ICollection<AppUserRole> UserRoles {get;set;}
    }
}