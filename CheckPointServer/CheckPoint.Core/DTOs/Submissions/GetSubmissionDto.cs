using CheckPoint.Core.DTOs.Exams;
using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.DTOs.Submissions
{
    public   class GetSubmissionDto:SubmissionDto
    {
        public int Id { get; set; }
        public ExamDto exam { get; set; }
    }
}
