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
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { RecoveryUserAccountComponent } from './views/recovery-user-account/recovery-user-account.component';
import { DocenteGuard } from './guards/docente.guard';
import { LogedGuard } from './guards/loged.guard';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate:[LogedGuard],component: HomeComponent },
  { path: 'alumno', canActivate: [AdminGuard], component: AlumnoComponent },
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent },
  { path: 'profesor', canActivate: [AdminGuard], component: ProfesorComponent },
  { path: 'grado', canActivate: [AdminGuard], component: GradoComponent },
  { path: 'seccion', canActivate: [AdminGuard], component: SeccionComponent },
  { path: 'curso', canActivate: [AdminGuard], component: CursoComponent },
  { path: 'anio', canActivate: [AdminGuard], component: AnioescolarComponent },
  { path: 'nivel', canActivate: [AdminGuard], component: NivelComponent },
  { path: 'periodo', component: PeriodoComponent, canActivate: [HoraAccesoGuard,AdminGuard] },
  { path: 'detalleCursoDocente', component:DetalleCursoDocenteComponent },
  { path: 'misCursosDocente', component:CursosAsignadosDocenteComponent },
  { path: 'detalleCursoDocente', canActivate: [AdminGuard],component:DetalleCursoDocenteComponent },
  { path: 'misCursosDocente',canActivate:[DocenteGuard], component:CursosAsignadosDocenteComponent },
  { path: 'alumnosCurso',canActivate:[DocenteGuard], component:AlumnosCursoDocenteComponent },
  { path: 'recoveryUserAccount', component:RecoveryUserAccountComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
