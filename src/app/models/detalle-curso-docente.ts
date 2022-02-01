import { Cursocl } from "./cursocl";
import { Periodocl } from "./periodocl";
import { Profesor } from "./profesor";
import { Seccioncl } from "./seccioncl";

export class DetalleCursoDocente {
    iddtcurso:number = 0;
    fechainicio:string = "";
    fechafinal:string = "";
    idcurso:Cursocl = new Cursocl();
    idprofesor:Profesor =  new Profesor();
    idseccion:Seccioncl = new Seccioncl();
}
