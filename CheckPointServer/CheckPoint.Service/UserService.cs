using CheckPoint.Core.Entities;
using CheckPoint.Core.IRepositories;
using ExamAI.Core.DTOs;
using System.Text.RegularExpressions;
using CheckPoint.Core.Services;
using CSharpFunctionalExtensions;
namespace CheckPoint.Service
{

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IGoogleSheetService _googleSheetService;

        public UserService(IUserRepository userRepository, IRepositoryManager repositoryManager, IGoogleSheetService googleSheetService)
        {
            _userRepository = userRepository;
            _repositoryManager = repositoryManager;
            _googleSheetService = googleSheetService;
        }


 
        ////החזרת המנהל 
        public async Task<List<Student>> GetStudentsAsync()
        {
            return await _userRepository.GetStudentsAsync();
        }
        //החזרת כל התלמידים 

        public async Task<List<Student>> GetStudentsByClassAsync(string @class)
        {
            return await _userRepository.GetStudentsByClassAsync(@class);
        }
        //החזרת תלמידים מכיתה מסוימת 

        public async Task<Student> GetByFullNameAndClassAsync(string FirstName, string LastName, string ClassName)
        {
            return await _userRepository.GetByFullNameAndClassAsync(FirstName, LastName, ClassName);
        }
        public async Task<User> GetByEmailAsync(string email)
        {

            return await _userRepository.GetByEmailAsync(email);
        }
        //-------------

        //החזרת משתמש עם מייל מסוים

        public async Task<User> GetStudentByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }
        public async Task<Result<User>> AddAsync(User user)
        {
            var validationResult = await IsValiedAsync(user);

            if (!validationResult.IsSuccess)
            {
                return validationResult;
            }

            // גיבוב הסיסמה לפני שמירה
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            await _userRepository.AddAsync(user);
            await _repositoryManager.SaveAsync();

            return Result.Success(user);
        }

        private static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            return Regex.IsMatch(email, pattern, RegexOptions.IgnoreCase);
        }
        private bool IsValidPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
                return false;
            bool hasLetter = password.Any(char.IsLetter);
            bool hasDigit = password.Any(char.IsDigit);
            return hasLetter && hasDigit;
        }
        private async Task<Result<User>> IsValiedAsync(User user, int id = 0)
        {
            if (user.Email == null || user.LastName == "" || user.FirstName == "" || user.Password == null ||
                (user is Student && ((Student)user).Class == ""))
                return Result.Failure<User>("All the fields are required");

            // Fix for CS0029: Await the Task<bool> returned by IsEmailExistsAsync  
            if (!await _googleSheetService.IsEmailExistsAsync(user.Email))
            {
                return Result.Failure<User>("The user not allowed to connect ");
            }

            var userByEmail = await _userRepository.GetByEmailAsync(user.Email);
            if (userByEmail != null && userByEmail.Id != id)
                return Result.Failure<User>("This email already exists");

            if (!IsValidEmail(user.Email))
                return Result.Failure<User>("Invalid email");

            if (!IsValidPassword(user.Password))
                return Result.Failure<User>("Invalid password");

            return Result.Success(user);
        }

        public async Task<Result<User>> UpdateAsync(int id, User user)
        {
            var validationResult = await IsValiedAsync(user,id); // ✅ עכשיו הפונקציה מחכה לתוצאה

            if (!validationResult.IsSuccess)
            {
                return validationResult; // מחזירים את תוצאת הוולידציה אם יש שגיאה
            }
            if (!string.IsNullOrEmpty(user.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }
            await _userRepository.UpdateAsync(id, user);
            await _repositoryManager.SaveAsync();

            return Result.Success(user); // מחזירים תוצאה תקינה עם המשתמש המעודכן
        }


        public async Task DeleteAsync(int id)
        {

            await _userRepository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();

        }
        //הוספת משתמש
        //עדכון
        //מחיקה

    }
}
