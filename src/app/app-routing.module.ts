import { CursoComponent } from './views/curso/curso.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AlumnoComponent } from './views/alumno/alumno.component';

import { GradoComponent } from './views/grado/grado.component';

import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { ProfesorComponent } from './views/profesor/profesor.component';
import { SeccionComponent } from './views/seccion/seccion.component';
import { AnioescolarComponent } from './views/anioescolar/anioescolar.component';
import { NivelComponent } from './views/nivel/nivel.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login', component:LoginComponent },
  { path: 'home', component:HomeComponent },
  { path: 'alumno', component:AlumnoComponent},
  { path: 'usuarios', component:UsuariosComponent },
  { path: 'profesor', component:ProfesorComponent },
  {path: 'grado', component:GradoComponent},
  {path: 'seccion', component:SeccionComponent},
  {path: 'curso', component:CursoComponent},
  {path: 'anio', component:AnioescolarComponent},
  {path: 'nivel', component:NivelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
