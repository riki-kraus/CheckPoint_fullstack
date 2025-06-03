using CheckPoint.Core.Entities;
using CheckPoint.Core.IRepositories;
using CheckPoint.Core.Services;
using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace CheckPoint.Service
{
    public class AnswerService: IAnswerService
    {
        private readonly IAnswerRepository _answerRepository;
        private readonly IRepositoryManager _repositoryManager;

        public AnswerService(IAnswerRepository answerRepository, IRepositoryManager repositoryManager) 
        {    _answerRepository = answerRepository;
            _repositoryManager = repositoryManager;
        }

      
        public async Task< Answer> GetByIdAsync(int id)
        {
            return await _answerRepository.GetByIdAsync(id);
        }
        //קבלת תשובה מסוימת

        public async Task<List<Answer>> GetByExamAsync(int examId)
        {
            return await _answerRepository.GetByExamAsync(examId);
        }
        //קבלת כל התשובות של מבחן מסוים
        //public async Task<Answer> GetByExamAndNumAsync(int examId, char numAns)
        //{
        //    return await _answerRepository.GetByExamAndNumAsync(examId,numAns);
        //}
        ////קבלת תשובה מסוימת של מבחן מסוים
        public async Task<Result<Answer>> AddAsync(Answer answer)
        {
            var validationResult = await IsValiedAnswer(answer);

            if (validationResult.IsFailure)
                return validationResult;

            await _answerRepository.AddAsync(answer);
            await _repositoryManager.SaveAsync();

            return Result.Success(answer); // לא validationResult
        }

        public async Task deleteAnswersAsyncByExamId(int examId)
        {
            await _answerRepository.deleteAnswersAsyncByExamId(examId);
            await _repositoryManager.SaveAsync();

        }
        public async Task<Answer> GetByExamIdAndSection(int examId, char section)
        {
           return  await _answerRepository.GetByExamIdAndSection(examId, section);

        }


        private async Task<Result<Answer>> IsValiedAnswer(Answer answer)
        {
            if (answer == null)
                return Result.Failure<Answer>("the answer can't be empty");

            if (answer.Section == ' ')
                return Result.Failure<Answer>("the section can't be empty");

            if (answer.Section < '\u05D0' || answer.Section > '\u05EA')
                return Result.Failure<Answer>("the section must be an hebrew");

            if (answer.CorrectAnswer == ' ')
                return Result.Failure<Answer>("the CorrectAnswer can't be empty");

            if (!char.IsDigit(answer.CorrectAnswer))
                return Result.Failure<Answer>("the CorrectAnswer must be a digit");

            // 🔧 קריאה אחת בלבד עם await
            var existingAnswer = await GetByExamIdAndSection(answer.ExamId, answer.Section);
            if (existingAnswer != null)
                return Result.Failure<Answer>($"this answer already exists: {existingAnswer.CorrectAnswer}");

            return Result.Success(answer);
        }
    }
}