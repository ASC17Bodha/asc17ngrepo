import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbAlertModule, CommonModule, MenuComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  // styleUrls: ['./app.component.scss'] in angular 16 and before
  //standalone: true in angular 16 and after
})
export class AppComponent {
  title = 'workshop-app';
  public isopen=true;
  constructor() {
    console.log('AppComponent constructor called');
  }
  toggle(){
    this.isopen=!this.isopen;
  }
}
