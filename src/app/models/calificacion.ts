import { Alumnocl } from "./alumnocl";
import { Cursocl } from "./cursocl";
import { Periodocl } from "./periodocl";

export class Calificacion {
    idcal:number = 0;
    fechacomplcal=null;
    observacioncal="";
    estado="1";
    idcurso:Cursocl = new Cursocl();
    idalumno:Alumnocl = new Alumnocl();
    idperiodo:Periodocl = new Periodocl();
}
