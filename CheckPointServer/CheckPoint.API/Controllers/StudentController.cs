using AutoMapper;
using CheckPoint.Core.DTOs.Students;
using CheckPoint.Core.Entities;
using CheckPoint.Core.Services;
using CheckPoint.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CheckPoint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public StudentController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        //[Authorize(Policy = "AdminOnly")]
        [HttpGet]

        public async Task<ActionResult> GetAll()
        {
            var students = await _userService.GetStudentsAsync();
            if (students == null || !students.Any())
            {
                return NotFound("There are no students to show");
            }
            var studentsDto = _mapper.Map<IEnumerable<GetStudentDto>>(students);
            return Ok(studentsDto);
        }

        //[Authorize(Policy = "Admin&Student")]
        [HttpGet("id/{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var student = await _userService.GetStudentByIdAsync(id);
            if (student == null) return NotFound("Student not found.");
            var studentDto = _mapper.Map<StudentDto>(student);
            return Ok(studentDto);
        }
        //[Authorize(Policy = "AdminOnly")]

        [HttpGet("class/{className}")]
        public async Task<ActionResult> GetByClass(string className)
        {
            var students = await _userService.GetStudentsByClassAsync(className);
            if (students == null || !students.Any())
                return NotFound($"{className} is not found");
            var studentsDto = _mapper.Map<IEnumerable<GetStudentDto>>(students);
            return Ok(studentsDto);
        }
        //[Authorize(Policy = "AdminOnly")]
        [HttpGet("byFullName")]
        public async Task<IActionResult> GetByFullNameAndClass(
            [FromQuery] string FirstName,
            [FromQuery] string LastName,
            [FromQuery] string ClassName)
        {
            if (string.IsNullOrWhiteSpace(FirstName) || string.IsNullOrWhiteSpace(LastName) || string.IsNullOrWhiteSpace(ClassName))
            {
                return BadRequest("All query parameters are required.");
            }

            var student = await _userService.GetByFullNameAndClassAsync(FirstName, LastName, ClassName);
            if (student == null)
            {
                return NotFound($"{FirstName} {LastName} is not found in {ClassName}");
            }

            var studentDto = _mapper.Map<GetStudentDto>(student);
            return Ok(studentDto);
        }
        //[Authorize(Policy = "Admin&Student")]

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] StudentDto newStudentDto)
        {
            if (newStudentDto == null)
                return BadRequest("User data is required.");

            var newStudent = _mapper.Map<Student>(newStudentDto);
            var result = await _userService.AddAsync(newStudent);

            if (!result.IsSuccess)
            {
                Console.WriteLine("error");
                return BadRequest(result.Error);
            }

            var studentsDto = _mapper.Map<GetStudentDto>(result.Value);
            return Ok(studentsDto);
        }
        //[Authorize(Policy = "AdminOnly")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] StudentDto updatedStudentDto)
        {
            var student = await _userService.GetStudentByIdAsync(id);
            if (student == null) return NotFound("Student not found.");

            var newStudent = _mapper.Map(updatedStudentDto, student);
            var result = await _userService.UpdateAsync(id, newStudent);

            if (!result.IsSuccess)
            {
                Console.WriteLine("error");
                return BadRequest(result.Error);
            }

            var studentsDto = _mapper.Map<GetStudentDto>(result.Value);
            return Ok(studentsDto);
        }
        //[Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _userService.GetStudentByIdAsync(id);
            if (student == null) return NotFound("Student not found.");

            await _userService.DeleteAsync(id);
            return NoContent();
        }
    }
}
