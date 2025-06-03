using AutoMapper;
using CheckPoint.Core.DTOs.Exams;
using CheckPoint.Core.DTOs.Students;
using CheckPoint.Core.DTOs.Submissions;
using CheckPoint.Core.Entities;
using ExamAI.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Exam, ExamDto>().ReverseMap();
            CreateMap<Exam, GetExamDto>().ReverseMap();
            CreateMap<Answer, AnswerDto>().ReverseMap();
            CreateMap<Student, StudentDto>().ReverseMap();
            CreateMap<Student, GetStudentDto>().ReverseMap();
            CreateMap<Submission, SubmissionDto>().ReverseMap();
            CreateMap<Submission, GetSubmissionDto>().ReverseMap();
            CreateMap<Manager, ManagerDto>().ReverseMap();
        }
    }
}
