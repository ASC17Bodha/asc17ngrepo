import { Component, Input } from '@angular/core';
import { Theme } from '../../workshops/models/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
@Input()
variant!:Theme;
}
