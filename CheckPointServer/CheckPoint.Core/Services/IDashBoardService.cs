using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface IDashBoardService
    {
        Task<double> GetClassAvgAsync(string className=null, string subject = null);
        Task<double> GetAvgOfStudentAsync(int studenId, string sub = null);
        Task<double> GetPassRateAsync(string className = null, string subject = null);
        Task<List<Submission>> GetExamBySubAndClassAsync(string className = null, string subject = null);
    }
}
