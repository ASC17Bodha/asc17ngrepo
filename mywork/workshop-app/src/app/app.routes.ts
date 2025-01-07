import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddWorkshopComponent } from './workshops/add-workshop/add-workshop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'workshop-app'
    },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path:"**",
        component:PageNotFoundComponent,
        title:'page-not-found'
    }
];
