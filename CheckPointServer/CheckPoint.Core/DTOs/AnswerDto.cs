

using CheckPoint.Core.Entities;

namespace ExamAI.Core.DTOs
{
    public class AnswerDto
    {
        //public int Id { get; set; }
        public int ExamId { get; set; }
        //public Exam Exam { get; set; }
        public char Section { get; set; }
        public char CorrectAnswer { get; set; }
        //public double Score { get; set; }


     
    }
}
