using CheckPoint.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
[ApiController]
[Route("api/[controller]")]
//[Authorize(Policy = "Admin&Student")]


public class SheetController : ControllerBase
{
    private readonly IGoogleSheetService _sheetService;
    private readonly IGoogleSheetService _GoogleSheetService;

    public SheetController(IGoogleSheetService sheetService, IGoogleSheetService googleSheetService)
    {
        _sheetService = sheetService;
        _GoogleSheetService = googleSheetService;
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllStudents()
    {
        var students = await _sheetService.GetStudentsAsync();
        return Ok(students);
    }

    [HttpGet("email")]
    public async Task<IActionResult> GetStudentEmail([FromQuery] string firstName, [FromQuery] string lastName, [FromQuery] string className)
    {
        var email = await _sheetService.FindStudentEmailAsync(firstName, lastName, className);
        if (email == null)
            return NotFound("התלמידה לא נמצאה");
        return Ok(new { email });
    }
  
    [HttpGet("email-exists")]
    public async Task<IActionResult> IsEmailExists([FromQuery] string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return BadRequest("יש להזין כתובת מייל.");

        bool exists = await _sheetService.IsEmailExistsAsync(email);
        return Ok(new { exists });
    }


}
