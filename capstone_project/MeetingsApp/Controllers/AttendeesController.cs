//using AutoMapper;
//using Microsoft.EntityFrameworkCore;
//using MeetingsApp.Data;
//using MeetingsApp.Models.Domain;
//using MeetingsApp.Models.DTO;
////using Microsoft.AspNetCore.Components;
//using Microsoft.AspNetCore.Mvc;


//namespace MeetingsApp.Controllers;

//[ApiController]
//[Route("/api/[controller]")]

//public class AttendeesController : ControllerBase
//{
//    private ApplicationDbContext _db;
//    private IMapper _mapper;
//    public AttendeesController(ApplicationDbContext db, IMapper mapper)
//    {
//        _db = db;
//        _mapper = mapper;
//    }
//    [HttpGet]
//    async public Task<IActionResult> GetAll()
//    {
//        var attendeesDomain = await _db.Attendee.ToListAsync();
//        var attendeesDto= _mapper.Map<List<AttendeesDto>>(attendeesDomain);
//        return Ok(attendeesDto);
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
public class AttendeesController : ControllerBase
{
    private readonly IAttendeesRepository _repo;
    private readonly IMapper _mapper;

    public AttendeesController(IAttendeesRepository repo, IMapper mapper)
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
        var attendeesDomain = await _repo.GetAllAttendeesAsync(
            filterOn, filterQuery, sortBy,
            isAscending ?? true, pageNumber, pageSize);

        var attendeesDto = _mapper.Map<List<AttendeesDto>>(attendeesDomain);
        return Ok(attendeesDto);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var attendeeDomain = await _repo.GetAttendeeByIdAsync(id);
        if (attendeeDomain == null)
        {
            return NotFound();
        }

        var attendeeDto = _mapper.Map<AttendeesDto>(attendeeDomain);
        return Ok(attendeeDto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AttendeesDto addAttendeeRequestDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var attendeeDomainModel = _mapper.Map<Attendee>(addAttendeeRequestDto);
        attendeeDomainModel = await _repo.CreateAttendeeAsync(attendeeDomainModel);
        var attendeeDto = _mapper.Map<AttendeesDto>(attendeeDomainModel);

        return CreatedAtAction(nameof(GetById), new { id = attendeeDto.Id }, attendeeDto);
    }

    [HttpPut]
    [Route("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] AttendeesDto updateAttendeeRequestDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var attendeeDomainModel = _mapper.Map<Attendee>(updateAttendeeRequestDto);
        attendeeDomainModel = await _repo.UpdateAttendeeAsync(id, attendeeDomainModel);

        if (attendeeDomainModel == null)
        {
            return NotFound();
        }

        var attendeeDto = _mapper.Map<AttendeesDto>(attendeeDomainModel);
        return Ok(attendeeDto);
    }

    [HttpDelete]
    [Route("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var attendeeDomainModel = await _repo.DeleteAttendeeAsync(id);
        if (attendeeDomainModel == null)
        {
            return NotFound();
        }

        return Ok();
    }
}
