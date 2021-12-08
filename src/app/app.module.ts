import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelsModule } from './models/models.module';
import { ServicesModule } from './services/services.module';
import { ViewsModule } from './views/views.module';
import { AlumnoComponent } from './views/alumno/alumno.component';
import { GradoComponent } from './views/grado/grado.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import {HttpClientModule} from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { Routes, RouterModule} from '@angular/router';
import { SeccionComponent } from './views/seccion/seccion.component';

const routers:Routes=[
  { path:'',redirectTo:'/alumno',pathMatch:'full'},
  { path:'alumno', component:AlumnoComponent},
  
  { path:'',redirectTo:'/grado',pathMatch:'full'},
  { path:'grado', component:GradoComponent},

  { path:'',redirectTo:'/seccion',pathMatch:'full'},
  { path:'seccion', component:SeccionComponent},

]
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ModelsModule,
    ViewsModule,
    ServicesModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule.forRoot(routers),
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
