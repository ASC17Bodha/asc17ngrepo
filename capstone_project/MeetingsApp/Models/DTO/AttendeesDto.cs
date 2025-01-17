using System.ComponentModel.DataAnnotations;

namespace MeetingsApp.Models.DTO
{
    public class AttendeesDto
    {
        
        public int Id { get; set; }
  
        public string Name { get; set; }
      
        public string Email { get; set; }

        public string Password {  get; set; }
    }
}
