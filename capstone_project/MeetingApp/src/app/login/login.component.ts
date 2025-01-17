import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../common/toast/toast.component';

import {
  AuthService,
  // ICredentials,
} from './../common/auth/auth.service';
import { IAttendees } from '../models/IMeetings';
import { ToastService } from '../common/toast.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  credentials: IAttendees = {
    id: 0,
    name: '',
    email: 'john.doe@example.com',
    password: 'Password123#',
  };

  loading = false;
  returnUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    // reset login status
    // this.authService.logout();
}
}

  // ngOnInit() {
    // reset login status
    // this.authService.logout();

    // get return url from route parameters or default to '/'
//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }

//   login() {
//     this.loading = true;
//     this.authService.login(this.credentials).subscribe({
//       next: (data) => {
//         this.router.navigate([this.returnUrl]);
//       },
//       error: (error) => {
//         this.toastService.show({
//           templateOrMessage: error.message,
//           classname: 'bg-danger text-light',
//           delay: 2000,
//         });

//         this.loading = false;
//       },
//     });
//   }
// }