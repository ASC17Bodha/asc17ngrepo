import { Routes } from "@angular/router";
import { WorkshopsListComponent } from "./workshops-list/workshops-list.component";
import { AddWorkshopComponent } from "./add-workshop/add-workshop.component";
import { FavoritesComponent } from "./favorites/favorites.component";

export const workshoproutes:Routes=[
    {
        path:'workshops',
        component:WorkshopsListComponent,
        title:'workshoplist'
    },
    {
        path:'workshops/add',
        component:AddWorkshopComponent,
        title:'addworkshop'
    },
    {
        path:'workshops/favorites',
        component:FavoritesComponent,
        title:'favorites'
    }
]