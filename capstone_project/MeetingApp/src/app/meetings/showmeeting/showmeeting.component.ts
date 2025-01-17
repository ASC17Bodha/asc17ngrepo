import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAttendees, IMeeting } from '../../models/IMeetings';
import { MeetingsService } from '../meetings.service';
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-showmeeting',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorAlertComponent,NgbDropdown],
  templateUrl: './showmeeting.component.html',
  styleUrl: './showmeeting.component.scss'
})
export class ShowmeetingComponent {
  searchTerm: string = '';
  meetings!: IMeeting[];
  error: Error | null = null;
  filteredMeetings: IMeeting[] = [];
  // attendees!: IAttendees[];

  constructor(private ms: MeetingsService) { }

  ngOnInit(): void {
    this.displaydetails();
  }

  displaydetails() {
    this.ms.getMeetings().subscribe({
      next: (data: IMeeting[]) => {
        this.meetings = data;
        this.filteredMeetings = data;
        this.error = null;
      },
      error: (err) => {
        this.error = err;
        console.error('Error fetching meetings:', err);
      }
    });
    console.log(this.meetings);
  }

  searchMeetings() {
    if (!this.searchTerm.trim()) {
      this.filteredMeetings = this.meetings;
      return;
    }

    this.filteredMeetings = this.meetings.filter(meeting => 
      meeting.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      // ||
      // meeting.attendees.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  removeAttendee(meeting: IMeeting,id: number, attendee: string) {
    const attendeeList = meeting.attendees.split(',');
    const index = attendeeList.indexOf(attendee);
    if (index > -1) {
        attendeeList.splice(index, 1);
        meeting.attendees = attendeeList.join(',');
        this.ms.updateMeeting(meeting,id).subscribe(
            response => {
                console.log('Attendee removed successfully:', response);
            },
            error => {
                console.error('Error removing attendee:', error);
            }
        );
    }
}
}