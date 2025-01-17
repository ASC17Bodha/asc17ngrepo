using MeetingsApp.Models.Domain;

namespace MeetingsApp.Repositories;

public interface IMeetingsRepository
{
    Task<List<Meeting>> GetAllAsync(string? filterOn = null, string? filterQuery = null,
        string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000);
    Task<Meeting?> GetByIdAsync(int id);
    Task<Meeting> CreateAsync(Meeting meeting);
    Task<Meeting?> UpdateAsync(int id, Meeting meeting);
    Task<Meeting?> DeleteAsync(int id);
}


