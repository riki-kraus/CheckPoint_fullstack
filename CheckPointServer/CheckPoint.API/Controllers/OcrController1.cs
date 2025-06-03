using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Org.BouncyCastle.Asn1.Ocsp;
using CheckPoint.Core.Services;

namespace CheckPoint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "AdminOnly")]

    public class OcrController : ControllerBase
    {
        private readonly IOcrService _ocrService;

        public OcrController(IOcrService ocrService)
        {
            _ocrService = ocrService;
        }

        [HttpPost("analyze-image")]
        public async Task<IActionResult> AnalyzeImage([FromBody] OcrRequest request)
        {
            var result = await _ocrService.AnalyzeImageAsync(request.Base64Image);
            return Ok(result);
        }
        public class OcrRequest
        {
            public string Base64Image { get; set; }
        }
    }
}
