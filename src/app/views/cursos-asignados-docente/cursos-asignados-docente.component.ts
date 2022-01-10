import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleCursoDocente } from 'src/app/models/detalle-curso-docente';
import { Gradocl } from 'src/app/models/gradocl';
import { Seccioncl } from 'src/app/models/seccioncl';
import { GradoService } from 'src/app/services/grado.service';
import { SDetalleCursoDocentesService } from 'src/app/services/s-detalle-curso-docentes.service';
import { SeccionService } from 'src/app/services/seccion.service';

export class detallecursosdocentegradoseccion{
  detallecursoDocente:DetalleCursoDocente = new DetalleCursoDocente()
  grado:Gradocl = new Gradocl()
  seccion:Seccioncl = new Seccioncl()
}

@Component({
  selector: 'app-cursos-asignados-docente',
  templateUrl: './cursos-asignados-docente.component.html',
  styleUrls: ['./cursos-asignados-docente.component.css']
})
export class CursosAsignadosDocenteComponent implements OnInit,AfterViewInit {

  constructor(private SDetalleCD:SDetalleCursoDocentesService,private route:ActivatedRoute,
    private SGrado:GradoService, private SSeccion:SeccionService) { }
  ngAfterViewInit(): void {
    
  }

  listPrimary:DetalleCursoDocente[]=[]
  listPrimaryMixed:detallecursosdocentegradoseccion[]=[]
  listSecondaryMixed:detallecursosdocentegradoseccion[]=[]
  listSecondary:DetalleCursoDocente[]=[]
  listSeccion:Seccioncl[]=[]
  panelOpenState = false;

  ngOnInit(): void {
    console.log("view initialized")
    this.SSeccion.getAll().subscribe({next:(lsecc)=>{

      this.SDetalleCD.getDetailByNivelDocente("Primaria",sessionStorage.getItem("username")||"null").subscribe({
        next:(dp)=>{
          dp.forEach(el => {
            let nw =  new detallecursosdocentegradoseccion()
            nw.detallecursoDocente = el;
            this.SGrado.get(nw.detallecursoDocente.idcurso.idgrado).subscribe({next:(grad)=>{
              nw.grado = grad
            },complete:()=>{ 
              lsecc.forEach((elsecc)=>{
                if(nw.detallecursoDocente.idcurso.idgrado == elsecc.idgrado){
                  nw.seccion = elsecc
                }
              });
              this.listPrimaryMixed.push(nw);
            }})
            
          });
          console.log(dp)
          this.listPrimary = dp   
          
        }
      })

      this.SDetalleCD.getDetailByNivelDocente("Secundaria",sessionStorage.getItem("username")||"null").subscribe({
        next:(ds)=>{
          ds.forEach(el => {
            let nw =  new detallecursosdocentegradoseccion()
            nw.detallecursoDocente = el;
            this.SGrado.get(nw.detallecursoDocente.idcurso.idgrado).subscribe({next:(grad)=>{
              nw.grado = grad
            },complete:()=>{ 
              lsecc.forEach((elsecc)=>{
                if(nw.detallecursoDocente.idcurso.idgrado == elsecc.idgrado){
                  nw.seccion = elsecc
                }
              });
              this.listSecondaryMixed.push(nw);
            }})
            
          });
          console.log(ds)
          this.listSecondary = ds
        }
      })
    } })
   
    
  
  }

}
