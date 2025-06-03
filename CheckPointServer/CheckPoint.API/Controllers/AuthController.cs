
using AutoMapper;
using CheckPoint.Core.DTOs.Students;
using CheckPoint.Core.Entities;
using CheckPoint.Core.Services;
using ExamAI.Core.DTOs;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IAuthService _authService;
    private readonly IUserService _userService;
    private readonly IGoogleAuthService _googleAuthService;
    private readonly IMapper _mapper;

    public AuthController(
        IConfiguration configuration,
        IAuthService authService,
        IUserService userService,
        IGoogleAuthService googleAuthService,
        IMapper mapper)
    {
        _configuration = configuration;
        _authService = authService;
        _userService = userService;
        _googleAuthService = googleAuthService;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
    {
        var user = await _authService.ValidateUser(model.Email, model.Password);
        if (user != null)
        {
            var token = _authService.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }
        return Unauthorized("לא נמצא משתמש זה");
    }

    [HttpPost("register-student")]
    public async Task<ActionResult<User>> RegisterStudent([FromBody] StudentDto studentDto)
    {
        var student = _mapper.Map<Student>(studentDto);
        return await RegisterUser(student);
    }

    [HttpPost("register-manager")]
    public async Task<ActionResult<User>> RegisterManager([FromBody] ManagerDto managerDto)
    {
        var manager = _mapper.Map<Manager>(managerDto);
        return await RegisterUser(manager);
    }

    private async Task<ActionResult<User>> RegisterUser(User user)
    {
        if (user == null)
            return BadRequest("User data is required.");

        var result = await _userService.AddAsync(user);
        if (result.IsFailure)
        {
            var errorMessage = result.Error ?? "Unknown error";

            if (errorMessage == "The user is not allowed to register")
                return StatusCode(403, errorMessage);

            return BadRequest(errorMessage);
        }
        return Ok(result.Value);
    }

    public class GoogleLoginRequest
    {
        public string IdToken { get; set; }
    }

    [HttpPost("google-login")]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
    {
        var payload = await _googleAuthService.VerifyGoogleTokenAsync(request.IdToken);

        if (payload == null)
            return Unauthorized("Invalid Google token");

        var user = await _userService.GetByEmailAsync(payload.Email);
        if (user == null)
        {
          

            return BadRequest("the user is not exists");
        }

        var token = _authService.GenerateJwtToken(user);
        return Ok(new { Token = token });
    }
}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}
