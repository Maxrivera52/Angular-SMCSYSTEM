import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumnocl } from 'src/app/models/alumnocl';
import { Calificacion } from 'src/app/models/calificacion';
import { Cursocl } from 'src/app/models/cursocl';
import { DetalleCalificacion } from 'src/app/models/detalle-calificacion';
import { Periodocl } from 'src/app/models/periodocl';
import { Seccioncl } from 'src/app/models/seccioncl';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CursoService } from 'src/app/services/curso.service';
import { DetalleCalificacionService } from 'src/app/services/detalle-calificacion.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { SCalificacionService } from 'src/app/services/scalificacion.service';
import { SeccionService } from 'src/app/services/seccion.service';

declare const swal: any;

export interface DialogData {
  curso: Cursocl;
  idseccion: number;
}


@Component({
  selector: 'app-alumnos-curso-docente',
  templateUrl: './alumnos-curso-docente.component.html',
  styleUrls: ['./alumnos-curso-docente.component.css']
})
export class AlumnosCursoDocenteComponent implements OnInit {

  columns:any[] = [];
  mainSelect = "calificar"

  panelOpenState = false;
  idseccion = 0
  idcurso = 0
  title = "Curso"
  curso: Cursocl = new Cursocl();
  seccion: Seccioncl = new Seccioncl();
  listAlumno: Alumnocl[] = []

  listDetalleCalificaciones: DetalleCalificacion[] = []
  listFilterCalificationAlumno:any[] = []

  constructor(private actRouter: ActivatedRoute,
    private SAlumno: AlumnoService, private SCurso: CursoService, private SSeccion: SeccionService,
    private SPeriodo: PeriodoService, private SDetalleCalificaciones: DetalleCalificacionService
    , private dialog: MatDialog) { }

  @ViewChild(MatTable)
  table!: MatTable<any>

  dataSource = new MatTableDataSource(this.listAlumno);

  displayedColumns:string[] = []
  
  ngOnInit(): void {
    this.load();
  }

  load() {
    this.actRouter.queryParams.subscribe(res => {
      console.log(res)
      this.idseccion = res['seccion']
      this.idcurso = res['curso']
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
    this.SDetalleCalificaciones.getByPeriodesinCurrentYear(this.idcurso, this.idseccion).subscribe(next => {
      this.listDetalleCalificaciones = next
      this.createStructureforTable();
    })
  }

  refreshtable() {
    this.SDetalleCalificaciones.getByPeriodesinCurrentYear(this.idcurso, this.idseccion).subscribe(next =>{
      this.listDetalleCalificaciones = next
      this.createStructureforTable()
    })
    this.dataSource = new MatTableDataSource(this.listFilterCalificationAlumno);
    // this.table.renderRows();
   // this.assignFilterPredicate();

  }
  /*
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
  }*/

  createStructureforTable() {
    let numberCalification = this.listDetalleCalificaciones.length / this.listAlumno.length
    // console.log(this.listDetalleCalificaciones.length +" // "+ this.listAlumno.length)
    // console.log(numberCalification)

    let listFilteredofCalificationAlumno = [];
    let listFiltradoWithObjetcAlumno = []
    let trueIndex = 0;
    //filtrar calificaciones por alumno
    for (let ind = 0; ind < numberCalification; ind++) {
      let detalle = this.listDetalleCalificaciones[trueIndex];
      if(detalle===undefined){
        break;
      }
      let listfilterByIndex: DetalleCalificacion[] = this.listDetalleCalificaciones.filter(det=>
        det.idalumno.idalumno == detalle.idalumno.idalumno);

      // console.log(this.listDetalleCalificaciones)
      // console.log(trueIndex)
      // console.log(this.listDetalleCalificaciones[0])
      // console.log(this.listDetalleCalificaciones[trueIndex].idalumno)
      // console.log(listfilterByIndex[0].idalumno)
      //let alumno:Alumnocl = new Alumnocl();
      let alumnoObject = Object.assign({}, listfilterByIndex[0].idalumno)
      // console.log(alumnoObject)
      let countTarea = 0;
      let countExamen = 0;
      this.displayedColumns = [];
      this.columns = []
      this.displayedColumns.push("codigo")
      this.displayedColumns.push("alumno")
      this.columns.push({columnDef: "codigo",header:"Codigo",cell:(elm:any)=>`${elm.idalumno}`})
      this.columns.push({columnDef: "alumno",header:"Alumno",cell:(elm:any)=>`${elm.nombre} ${elm.apellido}`})
      listfilterByIndex.forEach(el => {
        let prefix = "";
        console.log(el);
        (el.idcalificacion.tipo == "examen") ? (
          countExamen++,
          prefix = "examen" + countExamen
        ) : (
          countTarea++,
          prefix = "tarea" + countTarea
        )
        console.log(prefix)
        //alumnoObject[`${prefix}`] =el.puntuacion;
        this.displayedColumns.push(prefix);
      
        Object.defineProperty(alumnoObject, `${prefix}`, { value: el.puntuacion })
        //Object.assign(alumnoObject,{ '':"xd"})
        let elm:any = {}
        elm[prefix] = el.puntuacion
        console.log(elm)
        let newObj = Object.assign({},{columnDef: `${prefix}`,header:`${prefix.charAt(0).toLocaleUpperCase()}${prefix.slice(1)}`,cell:(elm:any)=>`${elm[prefix]}`})
        
        this.columns.push(newObj)
      });
      console.log(alumnoObject)
      console.log("+++++++++++++++++")
      listFilteredofCalificationAlumno.push(alumnoObject);
      console.log("/////////////////")
      trueIndex += numberCalification;

      console.log(trueIndex)
      
    }
    this.listFilterCalificationAlumno = listFilteredofCalificationAlumno
    console.log("-----------")
    console.log(listFilteredofCalificationAlumno)
    console.log(this.displayedColumns)
    //crear estructura que permita disponer en columnas todas las calificaciones según un unico registro(aplanar array)
    //usar Object.assign y luego hacer push
    console.log(this.columns)
  

  }

  openModalAddCalificacion() {
    let dialogRef = this.dialog.open(CalificacionesAlumno, {
      data: {
        curso: this.curso,
        idseccion: this.idseccion
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      this.load();
    });
  }
}


@Component({
  selector: "dialog-calificaciones-alumno",
  templateUrl: "./dialog-calificaciones-alumno.html"
})
export class CalificacionesAlumno {

  calificacion = new Calificacion();
  minDate: Date;
  fecha_entrega = new Date();
  titulo = ""
  descripcion = ""
  tipo = "tarea"
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private SCalificacion: SCalificacionService,
    private SDetalleCalificacion: DetalleCalificacionService,
    private dialogref: MatDialogRef<CalificacionesAlumno>) {
    console.log(data)
    let currenDate = new Date()
    this.minDate = new Date(currenDate.getFullYear(), currenDate.getMonth(), currenDate.getDate());

  }
  saveCalificacion() {
    this.calificacion.idcurso = this.data.curso
    this.calificacion.fecha_entrega = (this.fecha_entrega.getFullYear() + "-" + (this.fecha_entrega.getMonth() + 1) + "-" + this.fecha_entrega.getDay())
    this.calificacion.titulo = this.titulo
    this.calificacion.descripcion = this.descripcion
    this.calificacion.tipo = this.tipo
    console.log(this.calificacion)
    this.SCalificacion.create(this.calificacion).subscribe(calif => {
      let dtcal: DetalleCalificacion = new DetalleCalificacion();
      dtcal.idcalificacion = calif
      this.SDetalleCalificacion.saveDetailToAllAlumns(dtcal, this.data.idseccion).subscribe(detail => {
        console.log(detail)
        swal("Exito", "La asignación se registró correctamente", "success");
        this.dialogref.close();
      });

    })

  }
  /*
    
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
  
    */
}