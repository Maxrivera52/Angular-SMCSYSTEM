import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumnocl } from 'src/app/models/alumnocl';
import { Cursocl } from 'src/app/models/cursocl';
import { Seccioncl } from 'src/app/models/seccioncl';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-alumnos-curso-docente',
  templateUrl: './alumnos-curso-docente.component.html',
  styleUrls: ['./alumnos-curso-docente.component.css']
})
export class AlumnosCursoDocenteComponent implements OnInit {

  idseccion = 0
  idcurso = 0
  title = "Curso"
  curso:Cursocl = new Cursocl();
  seccion:Seccioncl = new Seccioncl();
  listAlumno:Alumnocl[]=[]
  constructor(private actRouter:ActivatedRoute, 
    private SAlumno:AlumnoService,private SCurso:CursoService,private SSeccion:SeccionService) { }

  @ViewChild(MatTable)
  table!:MatTable<any>

  dataSource = new MatTableDataSource(this.listAlumno);

  displayedColumns = ['nombre','apellido','dni','telefono']

  ngOnInit(): void {
    this.load();
  }

  load()
  {
    this.actRouter.params.subscribe(res=>{
      this.idseccion = res['idseccion']
      this.idcurso = res['idcurso']
      this.SAlumno.getBySeccionId(this.idseccion).subscribe(res=>{
        this.listAlumno = res
        console.log(this.listAlumno)
        this.refreshtable()
      })
      this.SCurso.get(this.idcurso).subscribe({next:(curso)=>{
        this.curso = curso
      }});
      this.SSeccion.get(this.idseccion).subscribe({next:(secc)=>this.seccion = secc})
    });
    
  }

  refreshtable(){
    this.dataSource = new MatTableDataSource(this.listAlumno);
    this.table.renderRows();
    this.assignFilterPredicate();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.nombre +
        data.apellido + data.dni + 
        data.telefono;
      dataStr = dataStr.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  clickRow(alumno:Alumnocl){
    console.log(alumno)
  }
}
