using System.ComponentModel.DataAnnotations;
using MeetingsApp.Models.Domain;

namespace MeetingsApp.Models.DTO
{
    public class MeetingsDto
    {
        public int Id { get; set; }

        public string Title { get; set; }
        
        public DateOnly Date { get; set; }
        
        public TimeOnly StartTime { get; set; }
       
        public TimeOnly EndTime { get; set; }
        public string Description { get; set; }
        
        public string Attendees { get; set; }

        //public Attendee? Attendee { get; set; }
    }
}
