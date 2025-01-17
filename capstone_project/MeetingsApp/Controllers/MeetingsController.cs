//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//using MeetingsApp.Data;
//using MeetingsApp.Models.Domain;
//using MeetingsApp.Models.DTO;
//using AutoMapper;

//namespace MeetingsApp.Controllers;

//[Route("/api/[controller]")]
//[ApiController]


//public class MeetingsController:ControllerBase
//{
//    private ApplicationDbContext _db;
//    private IMapper _mapper;
//    public MeetingsController(ApplicationDbContext db, IMapper mapper)
//    {
//        _db = db;
//        _mapper=mapper;
//    }
//    [HttpGet]
//   async public  Task<IActionResult> GetAll()
//    {
//        // Query the Workshops table to get a list of Workshop domain models
//        var meetingsDomain = await _db.Meetings.ToListAsync();

//        // convert the Domain model to DTO
//        //var meetingsDto = new List<MeetingsDto>();

//        //foreach (var meetingDomain in meetingsDomain)
//        //{
//        //    var meetingDto = new MeetingsDto
//        //    {
//        //        Id = meetingDomain.Id,
//        //        Title = meetingDomain.Title,
//        //        Date = meetingDomain.Date,
//        //        StartTime = meetingDomain.StartTime,
//        //        EndTime = meetingDomain.EndTime,
//        //        Description = meetingDomain.Description,
//        //        Attendees = meetingDomain.Attendees
//        //    };

//        //    meetingsDto.Add(meetingDto);
//        //}

//        var meetingsDto=_mapper.Map<List<MeetingsDto>>(meetingsDomain);

//        // always return DTO objects / list of DTO objects. Ok() send the data with an HTTP Success code of 200
//        return Ok(meetingsDto);
//    }
//}



using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MeetingsApp.Models.Domain;
using MeetingsApp.Models.DTO;
using MeetingsApp.Repositories;

namespace MeetingsApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MeetingsController : ControllerBase
{
    private readonly IMeetingsRepository _repo;
    private readonly IMapper _mapper;

    public MeetingsController(IMeetingsRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? filterOn,
        [FromQuery] string? filterQuery,
        [FromQuery] string? sortBy,
        [FromQuery] bool? isAscending,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 1000)
    {
        var meetingsDomain = await _repo.GetAllAsync(
            filterOn, filterQuery, sortBy,
            isAscending ?? true, pageNumber, pageSize);

        var meetingsDto = _mapper.Map<List<MeetingsDto>>(meetingsDomain);
        return Ok(meetingsDto);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var meetingDomain = await _repo.GetByIdAsync(id);
        if (meetingDomain == null)
        {
            return NotFound();
        }

        var meetingDto = _mapper.Map<MeetingsDto>(meetingDomain);
        return Ok(meetingDto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] MeetingsDto addMeetingRequestDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var meetingDomainModel = _mapper.Map<Meeting>(addMeetingRequestDto);
        meetingDomainModel = await _repo.CreateAsync(meetingDomainModel);
        var meetingDto = _mapper.Map<MeetingsDto>(meetingDomainModel);

        return CreatedAtAction(nameof(GetById), new { id = meetingDto.Id }, meetingDto);
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] MeetingsDto updateMeetingRequestDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var meetingDomainModel = _mapper.Map<Meeting>(updateMeetingRequestDto);
        meetingDomainModel = await _repo.UpdateAsync(id, meetingDomainModel);

        if (meetingDomainModel == null)
        {
            return NotFound();
        }

        var meetingDto = _mapper.Map<MeetingsDto>(meetingDomainModel);
        return Ok(meetingDto);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var meetingDomainModel = await _repo.DeleteAsync(id);
        if (meetingDomainModel == null)
        {
            return NotFound();
        }

        return Ok();
    }
}
