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
          if (element == materia.clave) {
            array.push(materia);
          }
        });
      });

      this.materias = array;
    }
  }
  filtrarResultados(filtro: string) {
    this.materias = this.materias.filter(materia => {
      return filtro == materia.cuatrimestrePertenece
    });
    this.showEstudiante.materias = [];
  }

  agregarMaterias(valor: any) {
    let materias: Array<string> = [];
    valor.forEach((element: { clave: string; }) => {
      materias.push(element.clave);
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
      this.estudianteService.updateEstudiante(this.delectedEstudiante.key!, {estado:0})
        .then(() => {
          this.estudiantes = this.estudiantes.filter(estudiante => {
            return estudiante.$id != this.delectedEstudiante.$id;
          })
          //mensaje success
          this.toastr.success("Registro eliminado exitosamente.", "Correcto");

        })
        .catch((error) => {
          this.toastr.error("Ha ocurrido un error al momento de realizar tu petici??n")
        });
    } catch (error) {
    }
  }

  async updateEstudiante() {
    var updateEstudiante = Object.assign({}, this.showEstudiante);
    await this.estudianteService
      .updateEstudiante(this.showEstudiante.key!, updateEstudiante)
      .then(() => {
        this.estudiantes.map(x => {
          if (x.$id == this.showEstudiante.$id) {
            x = this.showEstudiante;
          }
        });
        //mensaje success
        this.toastr.success("Registro modificado exitosamente.");
        setTimeout(() => {
          window.location.href = window.location.origin + "/estudiantes";
        }, 2000);
      })
      .catch(error => {
        this.toastr.error("Ha ocurrido un error al momento de realizar tu petici??n");
      });
  }

  async retrieveAllEstudiantes() {
    this.estudianteService.getEstudianteList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data()})
      )
      )
    ).subscribe(estudiante => {
      this.estudiantes = estudiante as [];
    }, (error) => {
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
    });
  }

  ngOnInit(): void {
    this.retrieveAllEstudiantes();
    this.retrieveAllMaterias();
  }


}
