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
    console.log(materia);
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
      this.materiaService.deleteMateria(this.deletedMateria.$key, this.deletedMateria.estado=0)
        .then(() => {
          this.materias = this.materias.filter(materia => {
            return materia.$key != this.deletedMateria.$key;
          })
          //mensaje success
          this.toastr.success("Registro eliminado exitosamente.", "Correcto");

        })
        .catch(error => {
          this.toastr.error("Ha ocurrido un error al momento de realizar tu petición")
        });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMateria() {
    var updatedMateria = Object.assign({}, this.showMateria);

    await this.materiaService
      .updateMateria(this.showMateria.$key, updatedMateria)
      .then(() => {
        this.materias.map(x => {
          if (x.$key == this.showMateria.$key) {
            x = this.showMateria;
          }
        });
        //mensaje success
        this.toastr.success("Registro modificado exitosamente.");
      })
      .catch(error => {
        this.toastr.error("Ha ocurrido un error al momento de realizar tu petición");
      });
  }

  async retrieveAllMaterias() {
    await this.materiaService.getMaterialesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(materia => {
      this.materias = materia as [];
    }, (error) => {
      console.log(error);
    });
  }
  ngOnInit(): void {
    this.retrieveAllMaterias();
  }

}
