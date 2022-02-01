import { Rol } from "./rol";

export class Usuario {
    idusuario:number = 0;
    correo:string = "";
    clave:string = "";
    estado:string = "";
    idrol:Rol = new Rol();
}
