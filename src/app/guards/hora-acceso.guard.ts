import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoraAccesoGuard implements CanActivate {
  // Ya que vamos a hacer un redirección si la hora es mayor de 22
  // Necesitamos importar el Router e inyectarlo al construictor
  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Obtenemos la hora actual  
    const hora = new Date().getHours();
    
    // Comparamos la hora con el maximo permitido
    // Esto sería en caso de que no queremos que 
    // pueda entrar a la página después de las 10:00 pm  
    if (hora >= 22) {
      // Si la hora es mayor o igual redireccionamos al homeComponent
      this.router.navigate(['']);
      // Si devolvemos FALSE no se permitirá el acceso
      return false;
    }

    // Si devolvemos TRUE si se permitirá el acceso.
    return true;
  }
  
}
