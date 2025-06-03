using CheckPoint.Core.DTOs.Students;
using Google.Apis.Sheets.v4;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface IGoogleSheetService
    {
        Task<SheetsService> GetSheetServiceAsync();


        Task<List<StudentDto>> GetStudentsAsync();

       Task<string?> FindStudentEmailAsync(string firstName, string lastName, string className);
       Task<bool> IsEmailExistsAsync(string email);


    }
}
