import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/services/alumno.service';
import { SprofesorService } from 'src/app/services/sprofesor.service';
import { SRolService } from 'src/app/services/srol.service';
import { SUsuarioService } from 'src/app/services/susuario.service';


declare var swal : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private service:SUsuarioService,
    private rolservice:SRolService,
    private docenteService:SprofesorService,
    private alumnoService:AlumnoService,
    private router:Router){}

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
          this.rolservice.getById(res.idrol).subscribe({
            next:(rol)=>{
              if(rol.descripcion == "administrador"){
                document.cookie = `username=ADMINISTRADOR`;
                this.setData("Administrador principal",rol.descripcion);
                window.location.href = "/home";
              }else if(rol.descripcion == "docente"){
                this.docenteService.getByUser(res.idusuario).subscribe({next:(prof)=>{
                  this.setData(prof.nombre+" "+prof.apellido,rol.descripcion);
                }});
              }else if(rol.descripcion == "alumno"){
                this.alumnoService.getByUser(res.idusuario).subscribe({
                  next:(alu)=>{
                    this.setData(alu.nombre +" "+ alu.apellido, rol.descripcion);
                  }})
              }

              //
              window.location.href = "/home";
            }
          });
          //this.router.navigate(["/home"]);
       
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
  setData(nombre: string, descripcion: string) {
    document.cookie = `username=${nombre}`;
    document.cookie = `rol=${descripcion}`;
    sessionStorage.setItem("rol",descripcion);
    sessionStorage.setItem("username",nombre);
  }
}