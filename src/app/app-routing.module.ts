import { HoraAccesoGuard } from './guards/hora-acceso.guard';
import { CursoComponent } from './views/curso/curso.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { AlumnoComponent } from './views/alumno/alumno.component';

import { GradoComponent } from './views/grado/grado.component';

import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { ProfesorComponent } from './views/profesor/profesor.component';
import { AdminGuard } from './guards/admin.guard';
import { SeccionComponent } from './views/seccion/seccion.component';
import { AnioescolarComponent } from './views/anioescolar/anioescolar.component';
import { NivelComponent } from './views/nivel/nivel.component';
import { PeriodoComponent } from './views/periodo/periodo.component';
import { DetalleCursoDocenteComponent } from './views/detalle-curso-docente/detalle-curso-docente.component';
import { CursosAsignadosDocenteComponent } from './views/cursos-asignados-docente/cursos-asignados-docente.component';
import { AlumnosCursoDocenteComponent } from './views/alumnos-curso-docente/alumnos-curso-docente.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'alumno', canActivate: [AdminGuard], component: AlumnoComponent },
  { path: 'usuarios',/* canActivate: [AdminGuard],*/ component: UsuariosComponent },
  { path: 'profesor', canActivate: [AdminGuard], component: ProfesorComponent },
  { path: 'grado', canActivate: [AdminGuard], component: GradoComponent },
  { path: 'seccion', canActivate: [AdminGuard], component: SeccionComponent },
  { path: 'curso', canActivate: [AdminGuard], component: CursoComponent },
  { path: 'anio', canActivate: [AdminGuard], component: AnioescolarComponent },
  { path: 'nivel', canActivate: [AdminGuard], component: NivelComponent },
  { path: 'periodo', component: PeriodoComponent, canActivate: [HoraAccesoGuard,AdminGuard] },
  { path: 'detalleCursoDocente', canActivate: [AdminGuard],component:DetalleCursoDocenteComponent },
  { path: 'misCursosDocente', component:CursosAsignadosDocenteComponent },
  { path: 'alumnosCurso/:idseccion/:idcurso', component:AlumnosCursoDocenteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
