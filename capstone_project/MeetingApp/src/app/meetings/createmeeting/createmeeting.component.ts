import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IMeeting } from '../../models/IMeetings'
import { MeetingsService } from '../meetings.service';
import { Router } from '@angular/router';
import { AttendeesService } from '../../attendees/attendees.service';

@Component({
  selector: 'app-createmeeting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createmeeting.component.html',
  styleUrl: './createmeeting.component.scss'
})
export class CreatemeetingComponent {
  meeting: IMeeting = {
    id: 0,
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    attendees: ''
  };
  attendeesList: any[] = [];
  selecteddAttendees: any[] = [];

  onAttendeesChange(event: any) {
    const selectedOptions=Array.from(event.target.selectedOptions,(option:any) => option.value);
    this.meeting.attendees = selectedOptions.join(', ');
  }


  constructor(private meetingService: MeetingsService, private router: Router, private attendeeService: AttendeesService) {
    this.loadAttendees();
  }

  loadAttendees() {
    this.attendeeService.getAttendees().subscribe({
      next: (attendees) => {
        this.attendeesList = attendees;
      },
      error: (error) => {
        console.error('Error loading attendees:', error);
      }
    });
  }

  createMeeting(form: NgForm) {
    
    if (form.valid) {
      this.meetingService.addMeeting(this.meeting).subscribe({
        next: (response) => {
          this.router.navigate(['/meetings']);
        },
        error: (error) => {
          console.error('Error creating meeting:', error);
        }
      });
    }
  }

}