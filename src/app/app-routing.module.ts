import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMateriaComponent } from './add-materia/add-materia.component';
import { ListMateriaComponent } from './list-materia/list-materia.component';

const routes: Routes = [
    {
        path: 'materias',
        component: ListMateriaComponent
    },
    {
        path: 'addMateria',
        component: AddMateriaComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }