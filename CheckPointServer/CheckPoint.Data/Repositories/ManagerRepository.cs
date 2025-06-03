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
//    public class ManagerRepository: IManagerRepository
//    {
//        private readonly DataContext _context;

//        public ManagerRepository(DataContext context)
//        {
//            _context = context;
//        }

//        //public List<Manager>GetAll()
//        //{
//        //    return _context.managers.ToList();
//        //}
//        public async Task<Manager> GetByIdAsync(int id)
//        {
//            return await _context.Users.OfType<Manager>().FirstOrDefaultAsync(x => x.Id == id);
//        }
//        //שליפת התוצאה לפי מזהה



//        public async  Task AddAsync(Manager manager)
//        {
//           await  _context.Users.AddAsync(manager);
//        }

//        public async Task<List<Manager>> GetAllAsync()
//        {
//            return await _context.Users.OfType<Manager>().ToListAsync();

//        }

        
//    }
//}
