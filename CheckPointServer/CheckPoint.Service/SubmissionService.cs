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
    public class SubmissionService: ISubmissionService
    {
        private readonly ISubmissionRepository _submissionRepository;
        private readonly IRepositoryManager _repositoryManager;

        public SubmissionService(ISubmissionRepository SubmissionRepository, IRepositoryManager repositoryManager)
        {
            _submissionRepository = SubmissionRepository;
            _repositoryManager = repositoryManager;
        }
        public async  Task<List<Submission>> GetByStudnetIdAsync(int id)
        {
            return await _submissionRepository.GetByStudnetIdAsync(id);

        }
        //שליפת התוצאה לפי מזהה

       public async Task<Submission> GetByExamIdAndStudentId(int examId, int studentId)
        {
            return await _submissionRepository.GetByExamIdAndStudentId(examId,studentId);
        }
        //שליפת התוצאות לפי כיתה
        public async Task<List<Submission>> GetBySubject(string sub)
        {
            return await _submissionRepository.GetBySubject(sub);
        }

        //שליפת התוצאה לפי נושא

        public async Task<double> GetAvgAsync(int studentId, string sub = null)
        {
            return await _submissionRepository.GetAvgAsync(studentId, sub);
        }
        public async Task AddAsync(Submission Submission)
        {
          await _submissionRepository.AddAsync(Submission);
            await _repositoryManager.SaveAsync();

        }

  
    }
}
