using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace MeetingsApp.Models.Domain
{
    public class MeetingAttendee
    {
        
        public int Id { get; set; } 


        public int MeetingId { get; set; }
        public Meeting Meeting { get; set; }

        public int AttendeeId { get; set; }
        public Attendee Attendee { get; set; }
    }
}
