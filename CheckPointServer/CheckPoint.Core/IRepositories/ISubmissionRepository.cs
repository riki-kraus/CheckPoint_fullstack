using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.IRepositories
{
    public interface ISubmissionRepository
    {
        Task<List< Submission>> GetByStudnetIdAsync(int studnetId);
        //Task< List<Submission>> GetByExamIdAsync(int examId);
         Task<Submission> GetByExamIdAndStudentId(int examId, int studentId);

        Task AddAsync(Submission res);
        Task<double> GetAvgAsync(int studentId, string sub = null);
        Task<List<Submission>> GetBySubject(string sub);
       Task deleteSubmissionsAsyncByExamId(int examId);

         //Task<Submission> GetByStudnetIdAsync(int studentId);
    }
}
