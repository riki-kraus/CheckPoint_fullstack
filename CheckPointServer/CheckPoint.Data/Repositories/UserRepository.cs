using CheckPoint.Core.Entities;
using CheckPoint.Core.IRepositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Manager> GetManagerAsync()
        {
            return await _context.Users.OfType<Manager>().FirstAsync();
        }
        //החזרת המנהל 
        public async Task<List<Student>> GetStudentsAsync()
        {
            return await _context.Users.OfType<Student>().ToListAsync();
        }
        //החזרת כל התלמידים 

        public async Task<List<Student>> GetStudentsByClassAsync(string @class)
        {
            return await _context.Users.OfType<Student>().Where(s => s.Class == @class).ToListAsync();
        }
        //החזרת תלמידים מכיתה מסוימת 
        public async Task<Student> GetByFullNameAndClassAsync(string FirstName,  string LastName,  string ClassName)
        {
            return await _context.Users.OfType<Student>().FirstOrDefaultAsync(s => s.Class == ClassName && s.FirstName== FirstName&&s.LastName== LastName);
        }
        public async Task<User> GetByEmailAsync(string email)
        {

            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
        //החזרת משתמש עם מייל מסוים

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }
        //הוספת משתמש
      

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.OfType<Student>().FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task DeleteAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user != null)
            {
                _context.Users.Remove(user);
                   
            }
        }

        public async Task UpdateAsync(int id, User newuser)
        {    // בדיקות ולידציה
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            user = newuser;

        }

    }
}
