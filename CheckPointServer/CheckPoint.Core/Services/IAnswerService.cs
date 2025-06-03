using CheckPoint.Core.Entities;
using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface IAnswerService
    {
        Task< Answer> GetByIdAsync(int id);
        Task< List<Answer>> GetByExamAsync(int examId);
        //Task<Answer> GetByExamAndNumAsync(int examId, char numAns);
        Task<Result<Answer>> AddAsync(Answer answer);
        Task<Answer> GetByExamIdAndSection(int examId, char section);
         Task deleteAnswersAsyncByExamId(int examId);

    }
}
