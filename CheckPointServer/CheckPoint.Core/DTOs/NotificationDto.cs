namespace CheckPoint.Core.DTOs
{
    public class NotificationDto
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public string Type { get; set; } // ניתן להחליף ל־enum אם רוצים
        public DateTime Timestamp { get; set; }
        public bool Read { get; set; }
        public string Priority { get; set; }
    }
}
