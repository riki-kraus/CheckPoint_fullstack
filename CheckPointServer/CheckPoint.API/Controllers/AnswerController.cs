
using AutoMapper;
using CheckPoint.Core.DTOs.Exams;
using CheckPoint.Core.DTOs.Students;
using CheckPoint.Core.Entities;
using CheckPoint.Core.Services;
using CheckPoint.Service;
using ExamAI.Core.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheckPoint.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "AdminOnly")]

    public class AnswerController : ControllerBase
    {
        private readonly IAnswerService _answerService;
        private readonly IMapper _mapper;

        public AnswerController(IAnswerService answerService, IMapper mapper)
        {
            _answerService = answerService;
            _mapper = mapper;
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            
            var answer =await _answerService.GetByIdAsync(id);
            var answerDto = _mapper.Map<AnswerDto>(answer);
            
            return Ok(answerDto);
        }

        [HttpGet("examId/{examId}")]
        public async Task<ActionResult> GetAnsByExam(int examId)
        {
            var list = await _answerService.GetByExamAsync(examId);
            return Ok(list);
         
        }

        [HttpPost]

        public async  Task<ActionResult> Post([FromBody] AnswerDto newAnswerDto)
        {
            if (newAnswerDto == null)
                return BadRequest("Answer data is required.");
            var newAnswer = _mapper.Map<Answer>(newAnswerDto);
             var result =  await _answerService.AddAsync(newAnswer);
            if (!result.IsSuccess)
            {
                Console.WriteLine("error");
                string errorMessage = result.Error; // גישה להודעת השגיאה
                return BadRequest(errorMessage); // מחזירים את השגיאה ללקוח
            }
            var answerDto = _mapper.Map<Answer>(result.Value);
            return Ok(answerDto);
        }
       

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }
        
        [HttpDelete("{examId}")]
        public async Task DeleteAsync(int examId)
        {
            await _answerService.deleteAnswersAsyncByExamId(examId);

        }
    }
}
