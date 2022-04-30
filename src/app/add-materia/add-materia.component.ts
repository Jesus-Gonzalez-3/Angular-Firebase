import { Component, OnInit } from '@angular/core';
import { Materia } from '../Models/materia';
import { MateriaService } from '../Controller/materia.service';
import { NotificationService } from '../notification.service'

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html'
})
export class AddMateriaComponent implements OnInit {
  materia: Materia = new Materia();
  title = 'toaster-not';

  constructor(private materiaService: MateriaService, private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    this.materia = new Materia();
  }

  save() {
    try {
      this.materiaService.createMateria(this.materia);
      this.notifyService.showSuccess("Registro creado exitosamente !!", "Correcto")
    } catch (error) {
      console.log(error);
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
