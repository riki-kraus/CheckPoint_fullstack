using CheckPoint.Core.Entities;
using CSharpFunctionalExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CheckPoint.Core.Services
{
    public interface IUserService
    {
        //Task<Manager> GetManagerAsync();
        Task<List<Student>> GetStudentsAsync();
        Task<List<Student>> GetStudentsByClassAsync(string @class);
        Task<User> GetByEmailAsync(string email);
        Task<Student> GetByFullNameAndClassAsync(string FirstName, string LastName, string className);

        Task<Result<User>> AddAsync(User user);
        //UpdateAsync
        Task<Result<User>> UpdateAsync(int id, User user);
        Task<User> GetStudentByIdAsync(int id);
        Task DeleteAsync(int id);
    }
}
