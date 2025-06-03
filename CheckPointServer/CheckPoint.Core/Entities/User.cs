using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Entities
{
    public abstract class User
    {
        public int Id { get; set; } // מפתח ראשי
        //public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // hash של הסיסמה
                                             // public string Role { get; set; }
        public DateTime Create_At { get; set; }
        public User() { }
        public User(int id, string email, string password)
        {
            Id = id;
            //UserName = userName;
            Email = email;
            Password = password;
            //cre
        }

    }
}
