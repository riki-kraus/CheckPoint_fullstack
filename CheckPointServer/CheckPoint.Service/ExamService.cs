using CheckPoint.Core.Entities;
using CheckPoint.Core.IRepositories;
using CheckPoint.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Service
{
    public class ExamService : IExamService
    {
        private readonly IExamRepository _examRepository;
        private readonly IRepositoryManager _repositoryManager;

        public ExamService(IExamRepository examRepository, IRepositoryManager repositoryManager)
        {
            _examRepository = examRepository;
            _repositoryManager = repositoryManager;
        }

        public async Task<List<Exam>> GetAllAsync()
        {
            return await _examRepository.GetAllAsync();
        }
        public async Task<Exam> GetByIdAsync(int id)
        {
            return await _examRepository.GetByIdAsync(id);
        }
        public async Task<Exam> GetBySubjectAndDate(string dateExam, string subject)
        {
            return await _examRepository.GetBySubjectAndDate(dateExam, subject);

        }
        //מבחן לפי מזהה

        //public List<Exam> GetByStudentId(int studentId)
        //{
        //    return _examRepository.GetByStudentId(studentId);
        //}
        //מבחנים לפי תלמיד

        //public async Task<List<Exam>> GetByClassAndByTitleAsync(string @class, string title)
        //{
        //    return await _examRepository.GetByClassAndByTitleAsync(@class,title);
        //}
        //מבחן לפי כיתה ולפי נושא: C, ה3
        //??
        public async Task<Exam> AddOrUpdateExamAsync(Exam exam)
        {
            var updatedExam = await _examRepository.AddOrUpdateExamAsync(exam);
            await _repositoryManager.SaveAsync();
            return updatedExam;
        }

        public async Task DeleteByIdAsync(int id)
        {
            await _examRepository.DeleteByIdAsync(id);
            await _repositoryManager.SaveAsync();

        }



    }
}
