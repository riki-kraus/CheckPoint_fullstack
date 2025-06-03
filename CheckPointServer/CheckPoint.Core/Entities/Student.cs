using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Entities
{
    public class Student : User
    {
        public string Class { get; set; }
        public List<Submission> Submissions { get; set; }
        public Student() { }

        public Student(string @class, List<Submission> submissions,int id, string email, string password):base(id,email,password)
        {
            Class = @class;
            Submissions = submissions;
        }
    }
}
