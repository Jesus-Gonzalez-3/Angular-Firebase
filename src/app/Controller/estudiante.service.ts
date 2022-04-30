import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as dayjs from 'dayjs';
import { Estudiante } from '../Models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private dbPath = '/estudiantes';

  estudiantesRef: AngularFirestoreCollection<Estudiante>;

  constructor(private db: AngularFirestore) {
    this.estudiantesRef = db.collection(this.dbPath);
  }

  createEstudiante(estudiante: Estudiante): void {
    this.estudiantesRef.add({...estudiante});
  }

  updateEstudiante(key: string, value: any): Promise<void> {
    return this.estudiantesRef.doc(key).update({...value});
  }

  deleteEstudiante(key: string): Promise<void> {
    return this.estudiantesRef.doc(key).delete();
  }

  getEstudianteList(): AngularFirestoreCollection<Estudiante> {
    return this.estudiantesRef;
  }
}
