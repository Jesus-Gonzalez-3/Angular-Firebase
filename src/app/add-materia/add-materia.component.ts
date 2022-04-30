import { Component, OnInit } from '@angular/core';
import { Materia } from '../Models/materia';
import { MateriaService } from '../Controller/materia.service';
import { NotificationService } from '../notification.service'

import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-add-materia',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './add-materia.component.html'
})
export class AddMateriaComponent implements OnInit {
  materia: Materia = new Materia();

  constructor(private materiaService: MateriaService, private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    this.materia = new Materia();
  }

  save() {
    try {
      this.materiaService.createMateria(this.materia);
      this.notifyService.showSuccess("Registro creado exitosamente !!", "Correcto");

      setTimeout(() => {
        window.location.href = window.location.origin + "/materias";
      }, 2000);
    } catch (error) {
      this.notifyService.showError("Ha ocurrido un error al momento de realizar tu petición", "Error");
    }


  }

  reset() {
    this.materia = new Materia();
  }

  /**
   * Function handles form submitting
   */
  onSubmit() {
    this.save();
    this.reset();
  }

}
