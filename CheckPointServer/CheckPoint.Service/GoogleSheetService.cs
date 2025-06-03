using CheckPoint.Core.DTOs.Students;
using CheckPoint.Core.Services;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class GoogleSheetService : IGoogleSheetService
{
    private readonly string[] Scopes = { SheetsService.Scope.SpreadsheetsReadonly };
    private readonly string ApplicationName = "CheckPoint";
    private readonly string _spreadsheetId;
    private readonly string _credentialsJson;

    public GoogleSheetService(IConfiguration configuration)
    {
        _spreadsheetId = configuration["GoogleSheets:SpreadsheetId"];
        _credentialsJson = configuration["GoogleSheets:CredentialsJson"]; // מחרוזת JSON מלאה
    }

    public async Task<SheetsService> GetSheetServiceAsync()
    {
        GoogleCredential credential;
        using (var stream = new MemoryStream(Encoding.UTF8.GetBytes(_credentialsJson)))
        {
            credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
        }

        return new SheetsService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credential,
            ApplicationName = ApplicationName,
        });
    }

    public async Task<List<StudentDto>> GetStudentsAsync()
    {
        var service = await GetSheetServiceAsync();
        var request = service.Spreadsheets.Values.Get(_spreadsheetId, "check_point_students");
        ValueRange response = await request.ExecuteAsync();
        IList<IList<object>> values = response.Values;

        var students = new List<StudentDto>();

        if (values != null && values.Count > 1)
        {
            for (int i = 1; i < values.Count; i++) // שורה ראשונה היא כותרות
            {
                var row = values[i];
                if (row.Count < 4 || string.IsNullOrWhiteSpace(row[0]?.ToString()))
                    continue; // דלג על שורות ריקות או חסרות מידע

                students.Add(new StudentDto
                {
                    FirstName = row[0]?.ToString() ?? "",
                    LastName = row[1]?.ToString() ?? "",
                    Class = row[2]?.ToString() ?? "",
                    Email = row[3]?.ToString() ?? "",
                });
            }
        }

        return students;
    }

    public async Task<string?> FindStudentEmailAsync(string firstName, string lastName, string className)
    {
        var students = await GetStudentsAsync();

        var student = students.FirstOrDefault(s =>
            string.Equals(s.FirstName, firstName, StringComparison.OrdinalIgnoreCase) &&
            string.Equals(s.LastName, lastName, StringComparison.OrdinalIgnoreCase) &&
            string.Equals(s.Class, className, StringComparison.OrdinalIgnoreCase));

        return student?.Email;
    }

    public async Task<bool> IsEmailExistsAsync(string email)
    {
        var students = await GetStudentsAsync();
        return students.Any(s =>
            string.Equals(s.Email?.Trim(), email?.Trim(), StringComparison.OrdinalIgnoreCase));
    }


}
