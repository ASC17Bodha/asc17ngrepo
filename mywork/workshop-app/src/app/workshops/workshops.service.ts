import { Injectable } from '@angular/core';
import { IWorkshop } from './models/IWorkshop';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {

  constructor(private http: HttpClient) { }

  getWorkshops(page:number) {
    return this.http.get<IWorkshop[]>(`http://localhost:8001/workshops`,{
      params:{
        _page: page
      },
    });
}
}
