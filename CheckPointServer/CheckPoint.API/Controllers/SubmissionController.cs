using AutoMapper;
using CheckPoint.Core.DTOs.Submissions;
using CheckPoint.Core.Entities;
using CheckPoint.Core.Services;
using CheckPoint.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CheckPoint.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SubmissionController : ControllerBase
    {
        private readonly ISubmissionService _SubmissionService;
        private readonly IMapper _mapper;

        public SubmissionController(ISubmissionService submissionService, IMapper mapper)
        {
            _SubmissionService = submissionService;
            _mapper = mapper;
        }

        [Authorize(Policy = "Admin&Student")]
        [HttpGet("StudentId/{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var submissions = await _SubmissionService.GetByStudnetIdAsync(id);
            if (submissions == null)
            {
                return NotFound($"There are not submissions for this student {id}");
            }
            var listDto = _mapper.Map<IEnumerable<GetSubmissionDto>>(submissions);
            return Ok(listDto);
        }
        [Authorize(Policy = "Admin&Student")]

        [HttpGet("examIdAndStudentId/{examId}/{studentId}")]
        public async Task<ActionResult> GetByExamIdAndStudentId(int examId, int studentId)
        {
            var submission = await _SubmissionService.GetByExamIdAndStudentId(examId, studentId);
            if (submission == null)
                return NotFound("אין");

            var dto = _mapper.Map<SubmissionDto>(submission); // לא רשימה!
            return Ok(dto);
        }

        [Authorize(Policy = "Admin")]

        // POST api/<SubmissionController>
        [HttpPost]
        public async Task Post([FromBody] SubmissionDto newSubmissionDto)
        {
            var newSubmission = _mapper.Map<Submission>(newSubmissionDto);
            await _SubmissionService.AddAsync(newSubmission);
        }


    }
}
