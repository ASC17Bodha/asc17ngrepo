using Microsoft.EntityFrameworkCore;
using MeetingsApp.Data;
using MeetingsApp.Models.Domain;

namespace MeetingsApp.Repositories;

public class SqlAttendeesRepository : IAttendeesRepository
{
    private readonly ApplicationDbContext _db;

    public SqlAttendeesRepository(ApplicationDbContext db)
    {
        _db = db;
    }


    public async Task<List<Attendee>> GetAllAttendeesAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000)
    {
        {
            var query = _db.Attendee.AsQueryable();

            // Filtering
            if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
            {
                if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(a => a.Name.ToUpper().Contains(filterQuery.ToUpper()));
                }
                else if (filterOn.Equals("Email", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(a => a.Email.ToUpper().Contains(filterQuery.ToUpper()));
                }
            }

            // Sorting
            if (!string.IsNullOrWhiteSpace(sortBy))
            {
                if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    query = isAscending ? query.OrderBy(a => a.Name) : query.OrderByDescending(a => a.Name);
                }
                else if (sortBy.Equals("Email", StringComparison.OrdinalIgnoreCase))
                {
                    query = isAscending ? query.OrderBy(a => a.Email) : query.OrderByDescending(a => a.Email);
                }
            }

            // Pagination
            var skipResults = (pageNumber - 1) * pageSize;
            query = query.Skip(skipResults).Take(pageSize);

            return await query.ToListAsync();
        }
    }

    public async Task<Attendee?> GetAttendeeByIdAsync(int id)
    {
        return await _db.Attendee
            .Include(a => a.Meeting)
            .ThenInclude(ma => ma.Meeting)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Attendee> CreateAttendeeAsync(Attendee attendee)
    {
        await _db.Attendee.AddAsync(attendee);
        await _db.SaveChangesAsync();
        return attendee;
    }

    public async Task<Attendee?> UpdateAttendeeAsync(int id, Attendee attendee)
    {
        var existingAttendee = await _db.Attendee.FirstOrDefaultAsync(a => a.Id == id);

        if (existingAttendee == null) return null;

        existingAttendee.Name = attendee.Name;
        existingAttendee.Email = attendee.Email;

        await _db.SaveChangesAsync();
        return existingAttendee;
    }

    public async Task<Attendee?> DeleteAttendeeAsync(int id)
    {
        var existingAttendee = await _db.Attendee.FirstOrDefaultAsync(a => a.Id == id);

        if (existingAttendee == null) return null;

        _db.Attendee.Remove(existingAttendee);
        await _db.SaveChangesAsync();
        return existingAttendee;
    }

    public async Task<bool> AssignMeetingAsync(int attendeeId, int meetingId)
    {
        var attendee = await _db.Attendee.FirstOrDefaultAsync(a => a.Id == attendeeId);
        var meeting = await _db.Meetings.FirstOrDefaultAsync(m => m.Id == meetingId);

        if (attendee == null || meeting == null) return false;

        var meetingAttendee = new MeetingAttendee
        {
            AttendeeId = attendeeId,
            MeetingId = meetingId
        };

        await _db.Set<MeetingAttendee>().AddAsync(meetingAttendee);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveFromMeetingAsync(int attendeeId, int meetingId)
    {
        var meetingAttendee = await _db.Set<MeetingAttendee>()
            .FirstOrDefaultAsync(ma => ma.AttendeeId == attendeeId && ma.MeetingId == meetingId);

        if (meetingAttendee == null) return false;

        _db.Set<MeetingAttendee>().Remove(meetingAttendee);
        await _db.SaveChangesAsync();
        return true;
    }

    

}
