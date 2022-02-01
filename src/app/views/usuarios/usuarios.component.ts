import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { SRolService } from 'src/app/services/srol.service';
import { SUsuarioService } from 'src/app/services/susuario.service';

declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listUsuario: Usuario[]=[];
  listRol:Rol[]=[];
  displayedColumns: string[]= ['id','correo','rol','estado'];

  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(private userv:SUsuarioService,private rserv:SRolService,private changdet:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.listRol = [];
    this.listUsuario = [];
    this.userv.getAll().subscribe({
      next:(e)=>{
        this.listUsuario = e;
        this.table.renderRows();
      },
      error:()=>{console.error("Error al recuperar lista de usuarios")},
    });
    this.rserv.getAll().subscribe(x=>{this.listRol = x});
  }

  clickRow(usu:Usuario){
    let options ="";
    for(let rol of this.listRol){
      if(rol.idrol == usu.idrol.idrol){
        options+=`<option value="${rol.idrol}" selected>Rol - ${rol.descripcion.charAt(0).toUpperCase()+rol.descripcion.slice(1)}</option>`;  
        continue;
      }
      options+=`<option value="${rol.idrol}">Rol - ${rol.descripcion.charAt(0).toUpperCase()+rol.descripcion.slice(1)}</option>`;
    }
    swal({
      title:"Actualizar Usuario",
      text:`
      <form>
        <select id=""class="form-control" disabled>${options}</select>
        <input type="text" id="correo" class="form-control" value="${usu.correo}" placeholder="Correo">
        <input type="password" id="oldpass" class="form-control" value="${usu.clave}" placeholder="Contraseña">
        <input type="password" id="newpass" class="form-control" placeholder="Confirmar nueva contraseña">
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3f6ad9',
      confirmButtonText: 'Actualizar',
      cancelButtonText:"Cancelar",
    }).catch(swal.snoop)
    .then((e:any)=>{
      
      //If confirm
      const correo = <HTMLInputElement>document.getElementById("correo");
      const oldpass = <HTMLInputElement>document.getElementById("oldpass");
      const newpass = <HTMLInputElement>document.getElementById("newpass");
      
      const regexp = new RegExp(/^[a-zA-Z0-9]+@\w{5,7}\.com$/,"g");
      
      swal({title:"Confirmación",text:"¿Estás seguro de actualizar?", 
      showCancelButton: true,  
      confirmButtonText: 'Sí,Actualizar',
      cancelButtonText:"No",
      type:"warning"}).catch(swal.snoop)
      .then(()=>{
        if(oldpass.value!=""&&regexp.test(correo.value)){
          if(oldpass.value.length>0 && oldpass.value.length<8){
            swal({title:"Campo inválido",text:"Ingrese una contraseña con mínimo 8 caracteres",type:"error"});
            return;
          }else if((newpass.value.length>0 && (oldpass.value != newpass.value))||((oldpass.value!=usu.clave)&&newpass.value=="")){
            swal({title:"Campo inválido",text:"Ambas contraseñas deben ser iguales",type:"error"});
            return;
          }
          usu.correo = correo.value;
          usu.clave = oldpass.value;

          this.userv.save(usu).subscribe({
            next:(ussv)=>{//console.log(ussv)
            },
            error:()=>{swal({title:"Error",text:"Ocurrió un error inesperado",type:"error"});},
            complete:()=>{
              swal({title:"Éxito",text:"Información del usuario actualizada",type:"success"});
              this.load();
    
            }
          });
        }else{
          swal({title:"Campo inválido",text:"Ingrese un correo o contraña válido",type:"error"});
        }
        
      },()=>{});
    },()=>{

    })
  }

  /*
  newUser(){
    let options ="";
    for(let rol of this.listRol){
      options+=`<option value="${rol.idrol}">Rol - ${rol.descripcion.charAt(0).toUpperCase()+rol.descripcion.slice(1)}</option>`;
    }
    swal({
      title:"Agregar Usuario",
      text:`
      <form>
        <input type="text" class="form-control" placeholder="Nombre"></input>
        <input type="text" class="form-control" placeholder="Correo"></input>
        <input type="password" class="form-control" placeholder="Contraseña"></input>
        <select id=""class="form-control">${options}</select>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText:"Cancelar",
    });
  }
*/
}
