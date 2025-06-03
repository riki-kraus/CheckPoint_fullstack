using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.IRepositories
{
    public interface IRepositoryManager
    {

        IAnswerRepository Answers { get; }
        IExamRepository Exams { get; }
        ISubmissionRepository Submissions { get; }
        //IManagerRepository Managers { get; }
        //IStudentRepository Students { get; }
        IUserRepository Users { get; }
        Task SaveAsync();

    }
}
