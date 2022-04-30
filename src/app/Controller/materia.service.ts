import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import * as dayjs from 'dayjs';
import { Materia } from '../Models/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private dbPath = '/materiales';

  materialesRef: AngularFireList<Materia>;

  constructor(private db: AngularFireDatabase) {
    this.materialesRef = db.list(this.dbPath);
  }

  createMateria(materia: Materia): void {
    this.materialesRef.push(materia);
  }

  updateMateria(key: string, value: any): Promise<void> {
    return this.materialesRef.update(key, value);
  }

  deleteMateria(key: string, value:any): Promise<void> {
    return this.materialesRef.set(key,value);
  }

  getMaterialesList(): AngularFireList<Materia> {
    return this.materialesRef;
  }

  deleteAll(): Promise<void> {
    return this.materialesRef.remove();
  }
}
