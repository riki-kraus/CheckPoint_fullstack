using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CheckPoint.Core.Entities
{
    public class Notification
    {

        //public string Id { get; set; }          // מזהה ייחודי של ההתראה
        //public string Title { get; set; }       // כותרת ההתראה
        //public string Message { get; set; }     // תוכן ההודעה
        //public string Type { get; set; }        // סוג ההתראה (info, warning, error...)
        //public string Priority { get; set; }    // עדיפות (low, medium, high)
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Type { get; set; } // ניתן להחליף ל־enum אם רוצים
        public DateTime Timestamp { get; set; }
        public bool Read { get; set; }
        public string Priority { get; set; }
    }
}
