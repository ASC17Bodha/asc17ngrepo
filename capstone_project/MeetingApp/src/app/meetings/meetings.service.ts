import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMeeting } from '../models/IMeetings';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  // apiUrl='http://localhost:3000/meetings';
  apiUrl='http://localhost:5230/api/Meetings'
  constructor(private http:HttpClient) { }
  getMeetings(){
    return this.http.get<IMeeting[]>(this.apiUrl);
  }
  getMeetingById(id:number){
    return this.http.get<IMeeting>(`${this.apiUrl}/${id}`);
  }
  addMeeting(meeting:IMeeting){
    return this.http.post<IMeeting>(this.apiUrl,meeting);
  }
  updateMeeting(meeting:IMeeting,id:number){
    return this.http.put<IMeeting>(`${this.apiUrl}/${id}`,meeting);
  }
  deleteMeeting(id:number){
    return this.http.delete<IMeeting>(`${this.apiUrl}/${id}`);
  }
  getMeetingsByDate(date:string){
    return this.http.get<IMeeting>(`${this.apiUrl}?date=${date}`);
  }
  getMeetingsByAttendees(attendees:string){
    return this.http.get<IMeeting>(`${this.apiUrl}?attendees=${attendees}`);
  }
}
