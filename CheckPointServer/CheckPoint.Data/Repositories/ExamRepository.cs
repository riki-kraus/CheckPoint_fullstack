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
    public class ExamRepository: IExamRepository
    {

        private readonly DataContext _context;
        private readonly IAnswerRepository _answerRepository;
        private readonly ISubmissionRepository _submissionRepository;

        public ExamRepository(DataContext context, IAnswerRepository answerRepository, ISubmissionRepository submissionRepository)
        {
            _context = context;
            _answerRepository = answerRepository;
            _submissionRepository = submissionRepository;
        }

        public async Task<List<Exam>> GetAllAsync()
        {
            return await _context.Exams.ToListAsync();
        }
        public async Task< Exam> GetByIdAsync(int id)
        {
            return await _context.Exams.FirstOrDefaultAsync(e => e.Id == id);
        }
        //מבחן לפי מזהה

        //public List<Exam> GetByStudentId(int studentId)
        //{
        //    return _context.exams.Where(e => e.StudentId == studentId).ToList();
        //}
        //מבחנים לפי תלמיד

        //public async Task< List<Exam>> GetByClassAndByTitleAsync(string @class,string title)
        //{
        //    return await _context.Exams.Where(e=>e.Class==@class&&e.Title==title).ToListAsync();
        //}
        //מבחן לפי כיתה ולפי נושא: C, ה3
        //??
        public async Task<Exam> AddOrUpdateExamAsync(Exam exam)
        {
            var existingExam = await GetBySubjectAndDate(exam.DateExam, exam.Subject);

            if (existingExam == null)
            {
                exam.DateCreated = DateTime.UtcNow;
                await _context.Exams.AddAsync(exam);
                return exam;
            }
            else
            {
                existingExam.File_Url_Exam = exam.File_Url_Exam;
                existingExam.DateCreated = DateTime.UtcNow;
                await _answerRepository.deleteAnswersAsyncByExamId(existingExam.Id);
                await _submissionRepository.deleteSubmissionsAsyncByExamId(existingExam.Id);
                return existingExam;
            }
        }


        public async Task DeleteByIdAsync(int id)
        {
            var exam = await _context.Exams.FirstOrDefaultAsync(a => a.Id == id) ;
            if (exam != null)
            {
                _context.Exams.Remove(exam);

            }
        }
        public async Task<Exam> GetBySubjectAndDate(string dateExam,string subject)
        {
            return await _context.Exams.FirstOrDefaultAsync(e => e.DateExam == dateExam&&e.Subject== subject);

        }
    }
}
