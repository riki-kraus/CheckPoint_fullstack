using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.IRepositories
{
    public interface IAnswerRepository
    {
        Task<Answer> GetByIdAsync(int id);
        Task<List<Answer>> GetByExamAsync(int examId);
        //Task<Answer> GetByExamAndNumAsync(int examId, char section);
        Task AddAsync(Answer answer);
        Task<Answer> GetByExamIdAndSection(int examId, char section);
        Task deleteAnswersAsyncByExamId(int examId);

    }
}
