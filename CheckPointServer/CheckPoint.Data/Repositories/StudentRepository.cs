//using CheckPoint.Core.Entities;
//using CheckPoint.Core.IRepositories;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace CheckPoint.Data.Repositories
//{
//    public class StudentRepository : IStudentRepository
//    {
//        private readonly DataContext _context;
//        public StudentRepository(DataContext context)
//        {
//            _context = context;
//        }
//        public async Task<List<Student>> GetAllAsync()
//        {
//            return await _context.Users.OfType<Student>().ToListAsync();
//        }
//        public async Task<Student >GetByIdAsync(int id)
//        {
//            return await _context.Users.OfType<Student>().FirstOrDefaultAsync(x => x.Id == id);
//        }
//        //שליפת התוצאה לפי מזהה

//        public async Task<Student> GetByNameAsync(string name)
//        {
//            return await _context.Users.OfType<Student>().FirstOrDefaultAsync(r => r.UserName == name);
//        }
//        //שליפת התוצאות לפי כיתה
//        public async Task< List<Student>> GetByClassAsync(string @class)
//        {
//            return await _context.Users.OfType<Student>().Where(s => s.Class == @class).ToListAsync();
//        }
//        public async Task AddAsync(Student student)
//        {
//           await _context.Users.AddAsync(student);
//        }

//    }

//}
