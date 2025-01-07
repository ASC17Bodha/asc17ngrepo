import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NgbAlertModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'My first Angular App';
  public count= 0;
  public isopen=true;
  constructor() {
    console.log('AppComponent constructor called');
  }
  public changeTitle(){
    this.title="My first Angular App - updated title";
    this.count++;
  }
  // toggle(){
  //   this.isopen=!this.isopen;
  // }
}
