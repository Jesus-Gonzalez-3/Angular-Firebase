import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import * as dayjs from 'dayjs';
import { Materia } from '../Models/materia';
export interface Item { name: string; }
@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private dbPath = '/materiales';

  materialesRef: AngularFirestoreCollection<Materia>;

  constructor(private db: AngularFirestore) {
    this.materialesRef = db.collection(this.dbPath);
  }

  createMateria(materia: Materia): void {
    this.materialesRef.add({...materia});
  }

  updateMateria(key: string, value: any): Promise<void> {
    return this.materialesRef.doc(key).update(value);
  }

  deleteMateria(key: string): Promise<void> {
    return this.materialesRef.doc(key).delete();
  }

  getMaterialesList(): AngularFirestoreCollection<Materia> {
    return this.materialesRef;
  }
}
