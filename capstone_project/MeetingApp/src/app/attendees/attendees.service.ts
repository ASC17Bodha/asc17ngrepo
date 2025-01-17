import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAttendees } from '../models/IMeetings';

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {
      // apiUrl='http://localhost:3000/attendees';
      apiUrl='http://localhost:5230/api/Attendees';
  constructor(private http: HttpClient) { }

  getAttendees(){
    return this.http.get<IAttendees[]>(this.apiUrl);
  }

  addAttendee(attendee: IAttendees){
    return this.http.post(this.apiUrl,attendee);
  }
  deleteAttendee(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateAttendee(attendee: IAttendees){
    return this.http.put(`${this.apiUrl}/${attendee.id}`,attendee);
  }
  getAttendeeById(id: number){
    return this.http.get<IAttendees>(`${this.apiUrl}/${id}`);
  }
}
