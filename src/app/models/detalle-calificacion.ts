import { Alumnocl } from "./alumnocl"
import { Calificacion } from "./calificacion"

export class DetalleCalificacion {
    id=0
    idalumno:Alumnocl = new Alumnocl()
    idcalificacion:Calificacion = new Calificacion()
    fecha_entregado=""
    puntuacion=0.0
    estado=""
}
