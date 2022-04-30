import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEstudianteComponent } from './add-estudiante/add-estudiante.component';
import { AddMateriaComponent } from './add-materia/add-materia.component';
import { ListEstudianteComponent } from './list-estudiante/list-estudiante.component';
import { ListMateriaComponent } from './list-materia/list-materia.component';

const routes: Routes = [
    {
        path: 'materias',
        component: ListMateriaComponent
    },
    {
        path: 'addMateria',
        component: AddMateriaComponent
    },
    {
        path: 'addEstudiante',
        component: AddEstudianteComponent
    },
    {
        path: 'estudiantes',
        component: ListEstudianteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }