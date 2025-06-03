using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Entities
{
    public class Submission
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }

        public int ExamId { get; set; }
        public Exam Exam { get; set; }
        [Range(0, 100)]
        public double Score { get; set; }
        public string File_Url { get; set; }
        public string File_Url_Feedback { get; set; }
        public DateTime DateCreated { get; set; }
    public Submission() { }
        public Submission(int id, int studentId, Student student, int examId, Exam exam, double score, string file_Url, string file_Url_Feedback, DateTime dateCreated)
        {
            Id = id;
            StudentId = studentId;
            Student = student;
            ExamId = examId;
            Exam = exam;
            Score = score;
            File_Url = file_Url;
            File_Url_Feedback = file_Url_Feedback;
            DateCreated = dateCreated;
        }
    }

}
