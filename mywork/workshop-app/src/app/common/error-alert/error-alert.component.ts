import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopsListComponent } from '../../workshops/workshops-list/workshops-list.component';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [NgbAlert,CommonModule],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss'
})
export class ErrorAlertComponent {
  @Input()
  error:Error|null=null;
  
    
}
