import { AlumnoComponent } from './alumno/alumno.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FormAlumnoComponent } from './alumno/form-alumno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GradoComponent } from './grado/grado.component';
import { FormGradoComponent } from './grado/form-grado.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    TopBarComponent,
    SideBarComponent,
    FormAlumnoComponent,
       HomeComponent,
       TopBarComponent,
       SideBarComponent,
       UsuariosComponent,
       AlumnoComponent,
       GradoComponent,
       FormGradoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class ViewsModule { }
