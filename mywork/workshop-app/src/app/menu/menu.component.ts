import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgbModule,RouterModule,RouterLink,NgbAlertModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  isNavbarCollapsed=true;
}
