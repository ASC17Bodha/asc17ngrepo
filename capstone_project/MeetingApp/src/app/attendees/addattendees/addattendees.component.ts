import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { IAttendees } from '../../models/IMeetings';
import { AttendeesService } from '../attendees.service';

@Component({
  selector: 'app-addattendees',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './addattendees.component.html',
  styleUrl: './addattendees.component.scss'
})
export class AddattendeesComponent {
  constructor(private as: AttendeesService) { }
  
  attendee: IAttendees = {
    id: 0,
    name: '',
    email: '',
    password: ''
  };
  confirmPassword: string = '';
  addAttendee(attendeeForm: Form) {
    console.log('Attendee added:', this.attendee);
    this.as.addAttendee(this.attendee).subscribe(
      (response) => {
        console.log('Attendee added successfully:', response);
        // attendeeForm.reset();
      },
      (error) => {
        console.error('Error adding attendee:', error);
      }
    );
  }
}
