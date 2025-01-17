using AutoMapper;
using MeetingsApp.Models.DTO;
using MeetingsApp.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MeetingsApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MeetingAttendeeController : ControllerBase
{
    private readonly IMeetingAttendeeRepository _repo;
    private readonly IMapper _mapper;

    public MeetingAttendeeController(IMeetingAttendeeRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    [HttpGet("meeting/{meetingId}/attendees")]
    public async Task<IActionResult> GetAttendeesByMeeting(int meetingId)
    {
        var attendees = await _repo.GetAttendeesByMeetingIdAsync(meetingId);
        var attendeesDto = _mapper.Map<List<AttendeesDto>>(attendees);
        return Ok(attendeesDto);
    }

    [HttpGet("attendee/{email}/meetings")]
    public async Task<IActionResult> GetMeetingsByAttendee(string email)
    {
        var meetings = await _repo.GetMeetingsByAttendeeEmailAsync(email);
        var meetingsDto = _mapper.Map<List<MeetingsDto>>(meetings);
        return Ok(meetingsDto);
    }

    [HttpPost("meeting/{meetingId}/attendees")]
    public async Task<IActionResult> AddAttendeesToMeeting(int meetingId, [FromBody] string attendeesEmailString)
    {
        var result = await _repo.AddAttendeesToMeetingAsync(meetingId, attendeesEmailString);
        return result ? Ok() : NotFound();
    }

    [HttpDelete("meeting/{meetingId}/attendee/{email}")]
    public async Task<IActionResult> RemoveAttendeeFromMeeting(int meetingId, string email)
    {
        var result = await _repo.RemoveAttendeeFromMeetingAsync(meetingId, email);
        return result ? Ok() : NotFound();
    }

    [HttpPost("migrate-existing-data")]
    public async Task<IActionResult> MigrateExistingData()
    {
        await _repo.MigrateExistingMeetingAttendeesAsync();
        return Ok("Data migration completed successfully");
    }

}

