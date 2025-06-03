using AutoMapper;
using CheckPoint.Core;
using CheckPoint.Core.DTOs.Exams;
using CheckPoint.Core.DTOs.Submissions;
using CheckPoint.Core.Entities;
using CheckPoint.Core.Services;
using CheckPoint.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheckPoint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Policy = "AdminOnly")]
    public class ExamController : ControllerBase
    {
        private readonly IExamService _examService;
        private readonly IMapper _mapper;

        public ExamController(IExamService examService, IMapper mapper)
        {
            _examService = examService;
            _mapper = mapper;
        }

        [HttpGet]

        public async Task<ActionResult<List<GetExamDto>>> GetAllAsync()
        {
            var exams = await _examService.GetAllAsync();
            return Ok(_mapper.Map<List<GetExamDto>>(exams));
        }
        [HttpGet("byId/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var exam = await _examService.GetByIdAsync(id);
            var examDto = _mapper.Map<ExamDto>(exam);
            return  Ok(examDto);
        }
        [HttpGet("BySubjectAndDate/{dateExam},{subject}")]
        public async Task<ActionResult> Get(string dateExam, string subject)
        {
            var exam = await _examService.GetBySubjectAndDate(dateExam, subject);
            var examDto = _mapper.Map<GetExamDto>(exam);
            return Ok(examDto);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ExamDto newexam)
        {
            var exam = _mapper.Map<Exam>(newexam);
            var savedExam = await _examService.AddOrUpdateExamAsync(exam);
            var getExamDto = _mapper.Map<GetExamDto>(savedExam);

            return CreatedAtAction(nameof(Get), new { id = savedExam.Id }, getExamDto);
        }


        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        [HttpDelete("{id}")]
        public async Task DeleteAsync(int id)
        {
             await _examService.DeleteByIdAsync(id);

        }
    }
}
