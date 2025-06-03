using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.IRepositories
{
    public interface IUserRepository
    {
        Task<Manager> GetManagerAsync();
        Task<List<Student>> GetStudentsAsync();
        Task<List<Student>> GetStudentsByClassAsync(string @class);
        Task<Student> GetByFullNameAndClassAsync(string FirstName, string LastName, string ClassName);

        Task<User> GetByEmailAsync(string email);

        Task AddAsync(User user);
        Task UpdateAsync(int id, User newuser);
            Task<User> GetByIdAsync(int id);
        Task DeleteAsync(int id);

    }
}
