using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public  interface IAuthService
    {
        string GenerateJwtToken(User user);
        Task<User> ValidateUser(string email, string password);
    }
}
