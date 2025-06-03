using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using CheckPoint.Core.Entities;

namespace CheckPoint.Core.Services
{
  public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<bool> SendEmailAsync(EmailRequest request)
        {
            Console.WriteLine(request);
            Console.WriteLine("----------");
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(
                    _config["EmailSettings:From"],      // כתובת קבועה
                    _config["EmailSettings:Password"]   // סיסמת אפליקציה
                ),
                EnableSsl = true,
            };

            var mail = new MailMessage
            {
                From = new MailAddress(_config["EmailSettings:From"], "CheckPoint | מערכת ציונים "), // תמיד אותו שולח
                Subject = $"{request.Name}",
                Body = $"<div style='direction: rtl; text-align: right;'>{request.Message}</div>",
                IsBodyHtml = true,
            };

            // כתובת הנמען נשלפת מהבקשה
            mail.To.Add(request.Email);

            await smtpClient.SendMailAsync(mail);
            return true;
        }

        
    }
}
