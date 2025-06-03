using CheckPoint.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Data
{
    public class DataContext:DbContext

    {
        //public DbSet<User> users { get; set; }

        public DbSet<Exam> Exams { get; set; } 
        public DbSet<Submission> Submissions { get; set; } 
        public DbSet<Answer> Answers { get; set; }

          public DbSet<User> Users { get; set; }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        //  public DbSet<Manager> managers { get; set; }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    //optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; Database=my_db;Trusted_Connection=True");
        //    // optionsBuilder.LogTo(msg => Debug.WriteLine(msg));
        //    //optionsBuilder.UseSqlServer("Server=mysql://u3npfnted96g8kqb:k7uC7iWlMoyPW9UYlLSa@bmexzugtq8qb3lcubu25-mysql.services.clever-cloud.com:3306/bmexzugtq8qb3lcubu25; Database=bmexzugtq8qb3lcubu25;Trusted_Connection=True");
        //    //var connectionString = _configuration.GetConnectionString("CheckPointDB");
        //    //optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));


        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // פתרון בעיית ה-Discriminator
            modelBuilder.Entity<User>()
                .HasDiscriminator<string>("Role")
                .HasValue<Student>("Student")
                .HasValue<Manager>("Admin");

        }
    }
}

