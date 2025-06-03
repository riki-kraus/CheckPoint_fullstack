using Microsoft.AspNetCore.Mvc;
using CheckPoint.Core.Entities;
using CheckPoint.Core.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace CheckPoint.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "Admin&Student")]

    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _emailService.SendEmailAsync(request);
                if (result)
                    return Ok(new { message = "הודעה נשלחה בהצלחה" });
                else
                    return StatusCode(500, new { error = "שליחת המייל נכשלה" });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
