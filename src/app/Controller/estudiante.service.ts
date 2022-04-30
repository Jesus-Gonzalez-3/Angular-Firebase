import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import * as dayjs from 'dayjs';
import { Estudiante } from '../Models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private dbPath = '/estudiantes';

  estudiantesRef: AngularFireList<Estudiante>;

  constructor(private db: AngularFireDatabase) {
    this.estudiantesRef = db.list(this.dbPath);
  }

  createEstudiante(estudiante: Estudiante): void {
    this.estudiantesRef.push(estudiante);
  }

  updateEstudiante(key: string, value: any): Promise<void> {
    return this.estudiantesRef.update(key, value);
  }

  deleteEstudiante(key: string): Promise<void> {
    return this.estudiantesRef.remove(key);
  }

  getEstudianteList(): AngularFireList<Estudiante> {
    return this.estudiantesRef;
  }

  deleteAll(): Promise<void> {
    return this.estudiantesRef.remove();
  }
}
