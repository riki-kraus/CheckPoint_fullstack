using CheckPoint.Core.Entities;

namespace CheckPoint.Core.DTOs.Exams
{
    public class ExamDto
    {
        //public int Id { get; set; }
        //public string Class { get; set; }
        public string Subject { get; set; }
        public string DateExam { get; set; }
        public  string  File_Url_Exam { get; set; }
        public DateTime DateCreated { get; set; }

        //public List<Answer> Answers { get; set; }
        //public List<Submission> Submissions { get; set; }

    }
}
