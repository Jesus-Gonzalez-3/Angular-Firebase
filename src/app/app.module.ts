import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddMateriaComponent } from './add-materia/add-materia.component';
import { ListMateriaComponent } from './list-materia/list-materia.component';
import { AddEstudianteComponent } from './add-estudiante/add-estudiante.component';
import { ListEstudianteComponent } from './list-estudiante/list-estudiante.component';
import { MensajesComponent } from './mensajes/mensajes.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    AddMateriaComponent,
    ListMateriaComponent,
    AddEstudianteComponent,
    ListEstudianteComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
