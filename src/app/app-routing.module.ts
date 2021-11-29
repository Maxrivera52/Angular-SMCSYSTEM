import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login', component:LoginComponent },
  { path: 'home', component:HomeComponent },
  { path: 'usuarios', component:UsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
