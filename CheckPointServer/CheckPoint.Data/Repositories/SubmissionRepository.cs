using CheckPoint.Core.Entities;
using CheckPoint.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Data.Repositories
{
    public class SubmissionRepository: ISubmissionRepository
    {
      
        private readonly DataContext _context;

        public SubmissionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Submission>> GetByStudnetIdAsync(int studentId)
        {
            return await _context.Submissions
                .Where(s => s.StudentId == studentId)
                .Include(s => s.Exam)
                .ToListAsync();
        }

        public async Task<List<Submission>> GetBySubject(string sub)
        {
            return await _context.Submissions
                .Where(s => s.Exam.Subject == sub)
                .Include(s => s.Exam)
                .ToListAsync();
        }
        //שליפת התוצאה לפי נושא

        //public async Task< List<Submission>> GetByExamIdAsync(int examId)
        //{
        //    return await _context.Submissions.Where(r => r.ExamId == examId).ToListAsync();
        //}
        //שליפת התוצאות לפי כיתה
        public async Task<Submission> GetByExamIdAndStudentId(int examId,int studentId)
        {
            return await _context.Submissions.FirstOrDefaultAsync(r => r.ExamId == examId && r.StudentId == studentId);

        }
        public async Task<double> GetAvgAsync(int studentId, string sub = null)
        {
            var query = _context.Submissions
                .Where(r => r.StudentId == studentId);

            if (!string.IsNullOrEmpty(sub))
            {
                query = query.Where(r => r.Exam.Subject == sub);
            }

            var scores = await query
                .Select(r => r.Score)
                .ToListAsync();

            if (!scores.Any())
                return 0;

            return (int)Math.Round(scores.Average());
        }

        //מוצא ממוצע  תלמיד לפי מקצוע (אופציונאלי)


        public async Task AddAsync(Submission res)
        {
            await _context.Submissions.AddAsync(res);
        }

        public async Task deleteSubmissionsAsyncByExamId(int examId)
        {

            var submissions = await _context.Submissions.Where(s => s.ExamId == examId).ToListAsync(); ;
            if (submissions != null)
            {
                foreach (var s in submissions)
                    _context.Submissions.Remove(s);

            }

        }


    }
}
