import { Calificacion } from "./calificacion";

export class Tarea {
    idtarea:number = 0;
    idcalificacion:Calificacion = new Calificacion();
    fechaasignacion="";
    fechaentrega="";
    titulo="";
    detalle="";
    puntaje:number=0.0;
    tipo="";
    estado="1";
}
