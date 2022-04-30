import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../Controller/estudiante.service';
import { MateriaService } from '../Controller/materia.service';
import { Estudiante } from '../Models/estudiante';
import { Materia } from '../Models/materia';
import { NotificationService } from '../notification.service';

import { map } from 'rxjs/operators';
import { NgSelectConfig } from '@ng-select/ng-select';

import { NgSelectModule, NgOption } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.css'],

})

export class AddEstudianteComponent implements OnInit {
  estudiante: Estudiante = new Estudiante();
  materias: Array<Materia> = [];

  constructor(private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private notifyService: NotificationService,
    private config: NgSelectConfig) {
  }

  async retrieveAllMaterias() {
    await this.materiaService.getMaterialesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(materia => {
      this.materias = materia as [];
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.estudiante = new Estudiante();
    this.retrieveAllMaterias();
  }

  filtrarResultados(filtro: string) {
    console.log(filtro)
    this.materias = this.materias.filter(materia => {
      return filtro == materia.cuatrimestrePertenece 
    });
    console.log(this.materias);
  }

  agregarMaterias(valor:any){
    console.log(valor[0]);
    let materias : Array<string>=[];
    valor.forEach((element: { id: string; }) => {
      console.log(element);
      
      materias.push(element.id);
    });
    this.estudiante.materias = materias;
    console.log(this.estudiante.materias);
  }

  save() {
    try {
      console.log(this.estudiante);
      this.estudianteService.createEstudiante(this.estudiante);
      this.notifyService.showSuccess("Registro creado exitosamente !!", "Correcto");
      setTimeout(() => {
        window.location.href = window.location.origin + "/estudiantes";
      }, 2000);
    } catch (error) {
      console.log(error);
      this.notifyService.showError("Ha ocurrido un error al momento de realizar tu petición", "Error");
    }
  }

  reset() {
    this.estudiante = new Estudiante();
  }

  onSubmit() {
    this.save();
    this.reset();
  }

}
