using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface IStudentService
    {
       Task <List<Student>> GetAllAsync();
        Task< Student> GetByIdAsync(int id);
        Task<Student >GetByNameAsync(string name);
        Task AddAsync(Student student);
        Task< List<Student>> GetByClassAsync(string @class);
    }
}
