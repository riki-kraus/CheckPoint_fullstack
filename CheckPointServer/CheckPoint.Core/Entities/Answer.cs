using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace CheckPoint.Core.Entities
{
    public class Answer
    {
        public int Id { get; set; }
        public char Section { get; set; }
        public char CorrectAnswer { get; set; }
        public int ExamId { get; set; }
        public Exam Exam { get; set; }

        //public double Score { get; set; }

       public Answer() { }

        public Answer(int id, char section, char correctAnswer, int examId, Exam exam)
        {
            Id = id;
            Section = section;
            CorrectAnswer = correctAnswer;
            ExamId = examId;
            Exam = exam;
            //Score = score;
        }
    }
}
