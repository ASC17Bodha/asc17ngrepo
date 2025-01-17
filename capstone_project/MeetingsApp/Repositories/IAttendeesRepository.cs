using MeetingsApp.Models.Domain;

namespace MeetingsApp.Repositories
{
    public interface IAttendeesRepository
    {

        Task<List<Attendee>> GetAllAttendeesAsync(string? filterOn = null, string? filterQuery = null,
            string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000);
        Task<Attendee?> GetAttendeeByIdAsync(int id);
        Task<Attendee> CreateAttendeeAsync(Attendee attendee);
        Task<Attendee?> UpdateAttendeeAsync(int id, Attendee attendee);
        Task<Attendee?> DeleteAttendeeAsync(int id);
    }
}
