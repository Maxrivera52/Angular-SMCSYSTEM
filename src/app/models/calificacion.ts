import { Cursocl } from "./cursocl";
import { Periodocl } from "./periodocl";

export class Calificacion {
    idcalificacion:number = 0;
    idcurso:Cursocl = new Cursocl();
    idperiodo:Periodocl = new Periodocl();
    tipo:string = "";
    fecha_asignacion:string="";
    fecha_entrega="";
    titulo=""
    descripcion=""
    estado="1";
}
