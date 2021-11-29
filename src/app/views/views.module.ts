import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
  
    LoginComponent,
       HomeComponent,
       TopBarComponent,
       SideBarComponent,
       UsuariosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ViewsModule { }
