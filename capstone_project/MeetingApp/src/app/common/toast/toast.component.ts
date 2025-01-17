import { Component,Inject,inject } from '@angular/core';
import { ToastService } from '../toast.service';
import { NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  public toastService= inject(ToastService);
}
