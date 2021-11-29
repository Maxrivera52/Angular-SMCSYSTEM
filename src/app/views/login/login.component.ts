import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { SUsuarioService } from 'src/app/services/susuario.service';


declare var swal : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private service:SUsuarioService, private router:Router){}

  correo:string="";
  clave:string="";

  ngOnInit(): void {

  }

  login(){
    let logres:any = null;
    console.log("login")
    console.log(`nombre=${this.correo}+clave=${this.clave}`);
  
    if (this.correo!=""&& this.clave!=""){
      this.service.loginUser(this.correo,this.clave).subscribe(res=>{
        logres = res;
        console.log(logres)
        if(logres!=null){
          //this.router.navigate(["/home"]);
          document.cookie = `username=${res.nombre}`;
          window.location.href = "/home";
          //this.router.navigate()
        }else{
          swal({
            title: 'Usuario no encontrado',
            text: "Verifique las credenciales e inténtelo de nuevo.",
            type: 'warning',
            confirmButtonColor: '#03A9F4',
          });
        }
      });
    }else{
      swal({
		  	title: 'Campos incompletos',
		  	text: "Verifique que todos los campos están completos.",
		  	type: 'warning',
		  	confirmButtonColor: '#03A9F4',
      });
    }
    
  }

}
