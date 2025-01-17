using MeetingsApp.Data;
using MeetingsApp.Models.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MeetingsApp.Repositories;

public class SqlMeetingAttendeeRepository : IMeetingAttendeeRepository
{
    private readonly ApplicationDbContext _db;

    public SqlMeetingAttendeeRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<List<Attendee>> GetAttendeesByMeetingIdAsync(int meetingId)
    {
        return await _db.MeetingAttendee
            .Where(ma => ma.MeetingId == meetingId)
            .Select(ma => ma.Attendee)
            .ToListAsync();
    }

    public async Task<List<Meeting>> GetMeetingsByAttendeeEmailAsync(string email)
    {
        var attendee = await _db.Attendee.FirstOrDefaultAsync(a => a.Email == email);
        if (attendee == null) return new List<Meeting>();

        return await _db.MeetingAttendee
            .Where(ma => ma.AttendeeId == attendee.Id)
            .Select(ma => ma.Meeting)
            .ToListAsync();
    }

    public async Task<bool> AddAttendeesToMeetingAsync(int meetingId, string attendeesEmailString)
    {
        var emailList = attendeesEmailString.Split(',').Select(e => e.Trim()).ToList();
        var meeting = await _db.Meetings.FindAsync(meetingId);
        if (meeting == null) return false;

        foreach (var email in emailList)
        {
            var attendee = await _db.Attendee.FirstOrDefaultAsync(a => a.Email == email);
            if (attendee != null)
            {
                var meetingAttendee = new MeetingAttendee
                {
                    MeetingId = meetingId,
                    AttendeeId = attendee.Id
                };
                await _db.MeetingAttendee.AddAsync(meetingAttendee);
            }
        }

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveAttendeeFromMeetingAsync(int meetingId, string email)
    {
        var attendee = await _db.Attendee.FirstOrDefaultAsync(a => a.Email == email);
        if (attendee == null) return false;

        var meetingAttendee = await _db.MeetingAttendee
            .FirstOrDefaultAsync(ma => ma.MeetingId == meetingId && ma.AttendeeId == attendee.Id);

        if (meetingAttendee == null) return false;

        _db.MeetingAttendee.Remove(meetingAttendee);
        await _db.SaveChangesAsync();
        return true;
    }
    public async Task MigrateExistingMeetingAttendeesAsync()
    {
        var meetings = await _db.Meetings.ToListAsync();

        foreach (var meeting in meetings)
        {
            if (string.IsNullOrEmpty(meeting.Attendees)) continue;

            var emailList = meeting.Attendees.Split(',')
                .Select(e => e.Trim())
                .Where(e => !string.IsNullOrEmpty(e));

            foreach (var email in emailList)
            {
                var attendee = await _db.Attendee.FirstOrDefaultAsync(a => a.Email == email);
                if (attendee != null)
                {
                    var meetingAttendee = new MeetingAttendee
                    {
                        MeetingId = meeting.Id,
                        AttendeeId = attendee.Id
                    };

                    var exists = await _db.MeetingAttendee
                        .AnyAsync(ma => ma.MeetingId == meeting.Id && ma.AttendeeId == attendee.Id);

                    if (!exists)
                    {
                        await _db.MeetingAttendee.AddAsync(meetingAttendee);
                    }
                }
            }
        }

        await _db.SaveChangesAsync();
    }

}

