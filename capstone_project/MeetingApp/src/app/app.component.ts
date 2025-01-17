import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreatemeetingComponent } from "./meetings/createmeeting/createmeeting.component";
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreatemeetingComponent,NgbAlert,CommonModule,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MeetingApp';
}
