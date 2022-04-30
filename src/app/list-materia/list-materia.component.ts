import { Component, OnInit } from '@angular/core';
import { Materia } from '../Models/materia';
import { MateriaService } from '../Controller/materia.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-list-materia',
  templateUrl: './list-materia.component.html',
  styleUrls: ['./list-materia.component.css']
})

export class ListMateriaComponent implements OnInit {

  materias: Array<Materia> = [];
  showMateria!: Materia;
  isSelected: boolean = false;
  deletedMateria!: Materia;

  constructor(private materiaService: MateriaService, private toastr: ToastrService) { }

  setMateriaDetails(materia: Materia) {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.showMateria = materia;
    }
  }

  prepareDeleteMateria(deleteMateria: Materia) {
    this.deletedMateria = deleteMateria;
  }

  deleteMateria() {
    try {
      this.materiaService.updateMateria(this.deletedMateria.key!, { estado: 0 })
        .then(() => {
          this.materias = this.materias.filter(materia => {
            return materia.$id != this.deletedMateria.$id;
          })
          //mensaje success
          this.toastr.success("Registro eliminado exitosamente.", "Correcto");
        })
        .catch(error => {
          this.toastr.error("Ha ocurrido un error al momento de realizar tu petición", "Error!")
        });
    } catch (error) {
      this.toastr.error("Ha ocurrido un error al momento de realizar tu petición", "Error!")
    }
  }

  async updateMateria() {
    var updatedMateria = {
      nombre: this.showMateria.nombre,
      totalCreditos: this.showMateria.totalCreditos,
      horasxsemana: this.showMateria.horasxsemana,
      ultimaFechaAct: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      cuatrimestrePertenece: this.showMateria.cuatrimestrePertenece,
    }

    await this.materiaService
      .updateMateria(this.showMateria.key!, updatedMateria)
      .then(() => {
        this.materias.map(x => {
          if (x.$id == this.showMateria.$id) {
            x = this.showMateria;
          }
        });
        //mensaje success
        this.toastr.success("Registro modificado exitosamente.");
        setTimeout(() => {
          window.location.href = window.location.origin + "/materias";
        }, 2000);
      })
      .catch(error => {
        this.toastr.error("Ha ocurrido un error al momento de realizar tu petición");
      });
  }

  async retrieveAllMaterias() {
    this.materiaService.getMaterialesList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })
      )
      )
    ).subscribe(materia => {
      this.materias = materia as [];
    }, (error) => {
      this.toastr.error("Ha ocurrido un error al momento de realizar tu petición", "Error!")
    });
  }
  ngOnInit(): void {
    this.retrieveAllMaterias();
  }

}
