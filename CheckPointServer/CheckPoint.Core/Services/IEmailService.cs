using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(EmailRequest request);

    }

}
