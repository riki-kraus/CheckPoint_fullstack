using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.IRepositories
{
    public interface IExamRepository
    {
        Task<List<Exam>> GetAllAsync();
      
        Task<Exam > GetByIdAsync(int id);
        // List<Exam> GetByStudentId(int studentId);
        //Task<List<Exam>> GetByClassAndByTitleAsync(string @class, string title);
       Task<Exam> AddOrUpdateExamAsync(Exam exam);
        Task DeleteByIdAsync(int id);
        Task<Exam> GetBySubjectAndDate(string dateExam, string subject);

    }
}
