import { Component, OnInit } from '@angular/core';
import { IWorkshop } from '../models/IWorkshop';
import { WorkshopsService } from '../workshops.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LoadingSpinnerComponent } from "../../common/loading-spinner/loading-spinner.component";
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
import { ItemComponent } from './item/item.component';
import { PaginationComponent } from '../../common/pagination/pagination.component';

@Component({
  selector: 'app-workshops-list',
  standalone: true,
  imports: [NgbAlert, LoadingSpinnerComponent,ErrorAlertComponent,ItemComponent,PaginationComponent],
  templateUrl: './workshops-list.component.html',
  styleUrl: './workshops-list.component.scss'
})
export class WorkshopsListComponent implements OnInit {
  loading = true;
  error: Error | null = null;
  workshops!: IWorkshop[];
  page: number = 1;

  // This is how you might create a service instance without DI - but we do not prefer this (good practice).
  // w : WorkshopService
  // w = new WorkshopsService();

  // Dependency Injection -> The dependency, i.e. WorkshopsService object is given to this component when the object is created by Angular
  constructor(private w: WorkshopsService) {
    // this.w = w;
  }

  getWorkshops(){
    this.loading = true;
    this.w.getWorkshops(this.page).subscribe({
      next: (data) => {
        console.log(data);
        this.workshops = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    })
  }

  public ngOnInit() {
    // console.log(this.w);
    // this.w.getWorkshops(this.page).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.workshops = data;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.error = err;
    //     this.loading = false;
    //   },
    // })
    this.getWorkshops();
  }
  
  ngOnDestroy() {
    console.log('WorkshopsListComponent destroyed');
  }

  changePage(by:number){
    this.page=by;
    this.getWorkshops();
  }
}