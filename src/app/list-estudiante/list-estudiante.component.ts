import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { EstudianteService } from '../Controller/estudiante.service';
import { Estudiante } from '../Models/estudiante';
import { Materia } from '../Models/materia';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-estudiante',
  templateUrl: './list-estudiante.component.html',
  styleUrls: ['./list-estudiante.component.css']
})
export class ListEstudianteComponent implements OnInit {

  materias: Array<Materia> = [];
  estudiantes: Array<Estudiante> = [];
  showEstudiantes!: Estudiante;
  isSelected: boolean = false;
  delectedEstudiante!: Estudiante;

  constructor( private estudianteService: EstudianteService, private toastr: ToastrService) { }

  setEstudianteDetails(estudiante: Estudiante) {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.showEstudiantes = estudiante;
    }
  }

  prepareDeleteMateria(delectedEstudiante: Estudiante) {
    this.delectedEstudiante = delectedEstudiante;
  }

  deleteMateria() {
    try {
      this.estudianteService.updateEstudiante(this.delectedEstudiante.$key, this.delectedEstudiante.estado=0)
        .then(() => {
          this.materias = this.materias.filter(materia => {
            return materia.$key != this.delectedEstudiante.$key;
          })
          //mensaje success
          this.toastr.success("Registro eliminado exitosamente.", "Correcto");

        })
        .catch((error) => {
          this.toastr.error("Ha ocurrido un error al momento de realizar tu petición")
        });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMateria() {
    var updateEstudiante = Object.assign({}, this.showEstudiantes);

    await this.estudianteService
      .updateEstudiante(this.showEstudiantes.$key, updateEstudiante)
      .then(() => {
        this.estudiantes.map(x => {
          if (x.$key == this.showEstudiantes.$key) {
            x = this.showEstudiantes;
          }
        });
        //mensaje success
        this.toastr.success("Registro modificado exitosamente.");
      })
      .catch(error => {
        this.toastr.error("Ha ocurrido un error al momento de realizar tu petición");
      });
  }

  async retrieveAllEstudiantes() {
    this.estudianteService.getEstudianteList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })
      )
      )
    ).subscribe(estudiante => {
      this.estudiantes = estudiante as [];
    }, (error) => {
      console.log(error);
    });
  }
  ngOnInit(): void {
    this.retrieveAllEstudiantes();
  }


}
