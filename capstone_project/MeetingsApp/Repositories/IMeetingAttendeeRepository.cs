using MeetingsApp.Models.Domain;
using Microsoft.AspNetCore.Mvc;

namespace MeetingsApp.Repositories;

public interface IMeetingAttendeeRepository
{
    Task<List<Attendee>> GetAttendeesByMeetingIdAsync(int meetingId);
    Task<List<Meeting>> GetMeetingsByAttendeeEmailAsync(string email);
    Task<bool> AddAttendeesToMeetingAsync(int meetingId, string attendeesEmailString);
    Task<bool> RemoveAttendeeFromMeetingAsync(int meetingId, string email);
    Task MigrateExistingMeetingAttendeesAsync();
}

