import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleCursoDocente } from 'src/app/models/detalle-curso-docente';
import { GradoService } from 'src/app/services/grado.service';
import { SDetalleCursoDocentesService } from 'src/app/services/s-detalle-curso-docentes.service';
import { SeccionService } from 'src/app/services/seccion.service';

declare const swal:any

@Component({
  selector: 'app-cursos-asignados-docente',
  templateUrl: './cursos-asignados-docente.component.html',
  styleUrls: ['./cursos-asignados-docente.component.css']
})
export class CursosAsignadosDocenteComponent implements OnInit{

  constructor(private SDetalleCD:SDetalleCursoDocentesService,private route:ActivatedRoute,
    private router:Router) { }

  listPrimary:DetalleCursoDocente[]=[]
  listSecondary:DetalleCursoDocente[]=[]
  panelOpenState = false;

  ngOnInit(): void {
    console.log("view initialized")
    this.SDetalleCD.getDetailByiddocente(sessionStorage.getItem("id")||"null").subscribe({
      next:(dp)=>{
        this.listPrimary = dp.filter((ldet:DetalleCursoDocente)=>ldet.idseccion.idgrado.idnivel.nombre.toLowerCase()=="primaria");
        this.listSecondary = dp.filter((ldet:DetalleCursoDocente)=>ldet.idseccion.idgrado.idnivel.nombre.toLowerCase()=="secundaria");
        console.log(this.listPrimary)
        console.log(this.listSecondary)
      }
    })
  }

  openModal(idseccion:Number,idcurso:Number){
    //this.router.navigate([`alumnosCurso/${idseccion}/${idcurso}`])
  }
}