import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumnocl } from 'src/app/models/alumnocl';
import { Calificacion } from 'src/app/models/calificacion';
import { Cursocl } from 'src/app/models/cursocl';
import { Periodocl } from 'src/app/models/periodocl';
import { Seccioncl } from 'src/app/models/seccioncl';
import { Tarea } from 'src/app/models/tarea';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { SCalificacionService } from 'src/app/services/scalificacion.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { STareaService } from 'src/app/services/starea.service';

declare const swal: any;

export interface DialogData {
  tareas: Tarea[];
  alumno: Alumnocl;
  curso: Cursocl;
}


@Component({
  selector: 'app-alumnos-curso-docente',
  templateUrl: './alumnos-curso-docente.component.html',
  styleUrls: ['./alumnos-curso-docente.component.css']
})
export class AlumnosCursoDocenteComponent implements OnInit {

  panelOpenState = false;
  idseccion = 0
  idcurso = 0
  title = "Curso"
  curso: Cursocl = new Cursocl();
  seccion: Seccioncl = new Seccioncl();
  listAlumno: Alumnocl[] = []
  constructor(private actRouter: ActivatedRoute,
    private SAlumno: AlumnoService, private SCurso: CursoService, private SSeccion: SeccionService,
    private STarea: STareaService, private SPeriodo: PeriodoService
    , private dialog: MatDialog) { }

  @ViewChild(MatTable)
  table!: MatTable<any>

  dataSource = new MatTableDataSource(this.listAlumno);

  displayedColumns = ['nombre', 'apellido', 'dni', 'telefono']

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.actRouter.params.subscribe(res => {
      this.idseccion = res['idseccion']
      this.idcurso = res['idcurso']
      this.SAlumno.getBySeccionId(this.idseccion).subscribe(res => {
        this.listAlumno = res
        console.log(this.listAlumno)
        this.refreshtable()
      })
      this.SCurso.get(this.idcurso).subscribe({
        next: (curso) => {
          this.curso = curso
        }
      });
      this.SSeccion.get(this.idseccion).subscribe({ next: (secc) => this.seccion = secc })
    });

  }

  refreshtable() {
    this.dataSource = new MatTableDataSource(this.listAlumno);
    this.table.renderRows();
    this.assignFilterPredicate();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  assignFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.nombre +
        data.apellido + data.dni +
        data.telefono;
      dataStr = dataStr.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  clickRowAlumno(alumno: Alumnocl) {
    let tareas: Tarea[] = [];
    this.STarea.getByIdAlumno(alumno.idalumno).subscribe({
      next: (tars) => {
        console.log(alumno)
        var dialogref = this.dialog.open(CalificacionesAlumno, {
          data: { tareas: tars, curso: this.curso, alumno: alumno }
        });

      }
    });

  }
}


@Component({
  selector: "dialog-calificaciones-alumno",
  templateUrl: "./dialog-calificaciones-alumno.html"
})
export class CalificacionesAlumno {
  periodos: Periodocl[] = [];
  periodo: Periodocl = new Periodocl();
  tarea: Tarea = new Tarea();
  calificacion = new Calificacion();
  fechainicio = "";
  fechafinal = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private SPeriodo: PeriodoService,
    private SCalificacion: SCalificacionService, private STarea: STareaService) {
    console.log(data)
    this.SPeriodo.getActives().subscribe({ next: (pers) => this.periodos = pers })
  }

  saveNewTarea() {
    const startdateformat = new Date(this.fechainicio)
    const enddateformat = new Date(this.fechafinal)
    const tarea = this.tarea;
    tarea.fechaasignacion = startdateformat.getFullYear() + "/" + (startdateformat.getMonth() + 1) + "/" + startdateformat.getDate();
    tarea.fechaentrega = enddateformat.getFullYear() + "/" + (enddateformat.getMonth() + 1) + "/" + enddateformat.getDate();
    console.log(this.tarea)
    console.log(this.periodo)
    this.SCalificacion.getByIdPeriodo(this.periodo.idperiodo).subscribe({
      next: (cal) => {
        if (cal == null) {
          this.calificacion.idalumno = this.data.alumno;
          this.calificacion.idcurso = this.data.curso;
          this.calificacion.idperiodo = this.periodo;
          this.SCalificacion.create(this.calificacion).subscribe({
            next: (ncal) => {
              this.calificacion = ncal
              tarea.idcalificacion = this.calificacion;
              this.STarea.create(tarea).subscribe({
                next: (tar) => {
                  swal("Registro exitoso", "La asignación se creó correctamente", "success")
                }
              });
            }
          })
        }
        else { 
          this.calificacion = cal;
          tarea.idcalificacion = this.calificacion;
          this.STarea.create(tarea).subscribe({
            next: (tar) => {
              swal("Registro exitoso", "La asignación se creó correctamente", "success")
            }
          });
        }
      }
    })
  }

  selectlistOptionPeriodo(id:number){
    
  }
}