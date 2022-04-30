import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { EstudianteService } from '../Controller/estudiante.service';
import { Estudiante } from '../Models/estudiante';
import { map } from 'rxjs/operators';
import { MateriaService } from '../Controller/materia.service';
import { Materia } from '../Models/materia';
import { NgSelectConfig } from '@ng-select/ng-select';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { contains } from 'jquery';

@Component({
  selector: 'app-list-estudiante',
  templateUrl: './list-estudiante.component.html',
  styleUrls: ['./list-estudiante.component.css']
})
export class ListEstudianteComponent implements OnInit {
  materias: Array<Materia> = [];
  estudiantes: Array<Estudiante> = [];
  showEstudiante!: Estudiante;
  isSelected: boolean = false;
  delectedEstudiante!: Estudiante;

  constructor(private estudianteService: EstudianteService,
    private toastr: ToastrService,
    private materiaService: MateriaService,
    private config: NgSelectConfig) { }

  setEstudianteDetails(estudiante: Estudiante) {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.showEstudiante = estudiante;
    }
  }
  setEstudianteDetails2(estudiante: Estudiante) {
    this.isSelected = !this.isSelected;
    if (this.isSelected) {
      this.showEstudiante = estudiante;
      let array: Array<Materia> = [];
      this.showEstudiante.materias.forEach(element => {
        this.materias.forEach(materia => {
          console.log(materia['clave']);
          if (element == materia.clave) {
            array.push(materia);
          }
        });
      });
      console.log(array);

      this.materias = array;
    }
  }
  filtrarResultados(filtro: string) {
    console.log(filtro)
    this.materias = this.materias.filter(materia => {
      return filtro == materia.cuatrimestrePertenece
    });
    console.log(this.materias);
  }

  agregarMaterias(valor: any) {
    let materias: Array<string> = [];
    valor.forEach((element: { key: string; }) => {
      materias.push(element.key);
    });
    this.showEstudiante.materias = materias;
  }

  imprimirListado() {
    try {
      this.toastr.info("Estamos Generando su archivo, espere un momento", "Generando PDF !!");
      let DATA: any = document.getElementById('modelIdShow');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 308;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('l', 'mm', 'a4');
        let position = 20;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('angular-demo.pdf');
      }).catch((error) => {
        this.toastr.error("Ha ocurrido un error, Intente mas tarde", "Error !!");
      });
    } catch (error) {
      this.toastr.error("Ha ocurrido un error, Intente mas tarde", "Error !!");
    }
  }

  prepareDeleteEstudiante(delectedEstudiante: Estudiante) {
    this.delectedEstudiante = delectedEstudiante;
  }


  deleteEstudiante() {
    try {
      this.estudianteService.deleteEstudiante(this.delectedEstudiante.$key)
        .then(() => {
          this.estudiantes = this.estudiantes.filter(estudiante => {
            return estudiante.$key != this.delectedEstudiante.$key;
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

  async updateEstudiante() {
    var updateEstudiante = Object.assign({}, this.showEstudiante);

    await this.estudianteService
      .updateEstudiante(this.showEstudiante.$key, updateEstudiante)
      .then(() => {
        this.estudiantes.map(x => {
          if (x.$key == this.showEstudiante.$key) {
            x = this.showEstudiante;
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

  async retrieveAllMaterias() {
    this.materiaService.getMaterialesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({clave: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(materia => {
      this.materias = materia as [];
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.retrieveAllEstudiantes();
    this.retrieveAllMaterias();
  }


}
