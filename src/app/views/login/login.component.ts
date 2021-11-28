import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { SUsuarioService } from 'src/app/services/susuario.service';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private service:SUsuarioService){}

  correo:string="";
  clave:string="";

  ngOnInit(): void {

  }

  login(){
    let logres:any = null;
    console.log("login")
    console.log(`nombre=${this.correo}+clave=${this.clave}`);
  
    if (this.correo!=""||this.clave!=""){
      this.service.loginUser(this.correo,this.clave).subscribe(res=>{logres = res});
      if(logres!=null){
        
      }
    }else{
      alert("Complete todos los campos");
    }
    
  }

}