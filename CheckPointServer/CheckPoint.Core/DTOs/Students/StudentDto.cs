using ExamAI.Core.DTOs;

namespace CheckPoint.Core.DTOs.Students
{
    public class StudentDto : UserDto
    {
        public string Class { get; set; }
        //public List<Submission> submissions { get; set; }
    }
}
