using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface ISubmissionService
    {
        Task<List<Submission>> GetByStudnetIdAsync(int id);
        //Task<List<Submission>> GetByExamIdAsync(int examId);
        Task<Submission> GetByExamIdAndStudentId(int examId,int studentId);
        Task<double> GetAvgAsync(int studentId, string sub = null);
        Task<List<Submission>> GetBySubject(string sub);
        Task AddAsync(Submission Submission);
    }
}
