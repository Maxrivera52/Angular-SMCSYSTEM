import { Profesor } from "./profesor";
import { Seccioncl } from "./seccioncl";

export class DetalleProfesorSeccion {
    iddtprofseccion:number = 0;
    idprofesor:Profesor = new Profesor();
    iseccion:Seccioncl = new Seccioncl();
    estado:string = "";
}
