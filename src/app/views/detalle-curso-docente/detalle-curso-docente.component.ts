import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cursocl } from 'src/app/models/cursocl';
import { DetalleCursoDocente } from 'src/app/models/detalle-curso-docente';
import { Periodocl } from 'src/app/models/periodocl';
import { Profesor } from 'src/app/models/profesor';
import { CursoService } from 'src/app/services/curso.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { SDetalleCursoDocentesService } from 'src/app/services/s-detalle-curso-docentes.service';
import { SprofesorService } from 'src/app/services/sprofesor.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Gradocl } from 'src/app/models/gradocl';
import { GradoService } from 'src/app/services/grado.service';
import { Seccioncl } from 'src/app/models/seccioncl';
import { SeccionService } from 'src/app/services/seccion.service';

declare var swal:any;

export interface DialogData {
  listCursos:Cursocl[]
  listDocentes:Profesor[]
  detailCursoDocente:DetalleCursoDocente
  listGrados:Gradocl[]
}

@Component({
  selector: 'app-detalle-curso-docente',
  templateUrl: './detalle-curso-docente.component.html',
  styleUrls: ['./detalle-curso-docente.component.css']
})
export class DetalleCursoDocenteComponent implements OnInit {

  constructor(public dialog:MatDialog,
    private sDetalleCD:SDetalleCursoDocentesService,
    private sCurso:CursoService,
    private sGrado:GradoService
    ,private sProfesor:SprofesorService) { }

  @ViewChild(MatTable)
  table!:MatTable<any>;


  listDetalleCursoDocente:DetalleCursoDocente[] = [];
  listProfesores:Profesor[] = [];
  listCursos:Cursocl[] = [];
  listGrados:Gradocl[] = [];
  dataSource = new MatTableDataSource(this.listDetalleCursoDocente);

  displayedColumns = ['identificador','seccion','curso','profesor','inicio','final'];

  ngOnInit(): void {
    this.load()
  }

  load(){
    this.sDetalleCD.getAll().subscribe({
      next:(ldcd)=>{
        this.listDetalleCursoDocente = ldcd;
        console.log(ldcd)
        this.refreshtable();
      }
    });

    this.sProfesor.getAll().subscribe({next:(prof)=>this.listProfesores = prof});
    this.sCurso.getAll().subscribe({next:(cursos)=>this.listCursos = cursos})
    this.sGrado.getAll().subscribe(grados=>{
      this.listGrados=grados
      console.log(this.listGrados)
    });
  }

  refreshtable(){
    this.dataSource = new MatTableDataSource(this.listDetalleCursoDocente);
    this.table.renderRows();
    this.assignFilterPredicate();

  }
  
  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.idcurso.descripcion +
        data.idprofesor.nombre + data.idprofesor.apellido + 
        data.fechainicio + data.fechafinal;
      dataStr = dataStr.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  newAssign(){
    const dialogRef = this.dialog.open(DialogDetalleCursoDocente,{ 
      data:{ listCursos: this.listCursos,
        listDocentes:this.listProfesores,
        detailCursoDocente:new DetalleCursoDocente(),
        listGrados:this.listGrados
      } });
    dialogRef.afterClosed().subscribe(res=>this.load())

  }


  clickRow(row:DetalleCursoDocente){
    const startdateformat = new Date(row.fechainicio)
    const enddateformat = new Date(row.fechafinal)
    row.fechainicio = startdateformat.toDateString()//.getFullYear()+"/"+(startdateformat.getMonth()+1)+"/"+startdateformat.getDate();
    row.fechafinal = enddateformat.toDateString()//.getFullYear()+"/"+(enddateformat.getMonth()+1)+"/"+enddateformat.getDate();
    

    const dialogRef = this.dialog.open(DialogDetalleCursoDocente,{ data:{ listCursos:this.listCursos,
      listDocentes:this.listProfesores,
      detailCursoDocente:row,
      listGrados:this.listGrados
    } })

    dialogRef.afterClosed().subscribe(res=>this.load())
  }

}

@Component({
  selector:"dialog-detalle-curso-docente",
  templateUrl:"./dialog-detalle-curso-docente.html"
})
export class DialogDetalleCursoDocente{
  startdate:any = null;
  enddate:any = null;
  idgrado:number = 0;
  listCursos:Cursocl[]=[];
  listSecciones:Seccioncl[]=[]
  constructor(@Inject(MAT_DIALOG_DATA) public data:DialogData,private sDetalleCD:SDetalleCursoDocentesService,
     private sCurso:CursoService,
     private sSeccion:SeccionService, 
     private dialogRef:MatDialogRef<DialogDetalleCursoDocente>){ 
      if(data.detailCursoDocente.fechainicio != ""){

        this.startdate = new Date(data.detailCursoDocente.fechainicio)
        this.enddate = new Date(data.detailCursoDocente.fechafinal)
      }
  }
  getCourseByGrado(id:number){
    this.sCurso.getCourseByGrado(id).subscribe(cursos=>this.listCursos=cursos)
    this.sSeccion.getByIdGrado(id).subscribe(secc=>this.listSecciones = secc)
  }


  submit(){
    const startdateformat = new Date(this.startdate)
    const enddateformat = new Date(this.enddate)

    const detallecursodocente:DetalleCursoDocente = this.data.detailCursoDocente;
    detallecursodocente.fechainicio = startdateformat.getFullYear()+"/"+(startdateformat.getMonth()+1)+"/"+startdateformat.getDate();
    detallecursodocente.fechafinal = enddateformat.getFullYear()+"/"+(enddateformat.getMonth()+1)+"/"+enddateformat.getDate();
    console.log(detallecursodocente)
    const validations = this.validateForm(detallecursodocente);
    if(validations){
      this.sDetalleCD.save(detallecursodocente).subscribe({
        next:(det)=>{swal("Guardado","Se registró con éxito","success");this.dialogRef.close()}
      });
    } 
  }

  validateForm(detallecursodocente:DetalleCursoDocente):Boolean{
    if(detallecursodocente.idcurso.idcurso == 0) { 
      swal("Campo faltante","Seleccione un curso","error");return false
    }
    if(detallecursodocente.idprofesor.idprofesor == 0) { 
      swal("Campo faltante","Seleccione un docente","error");return false
    }
    if(detallecursodocente.fechainicio === detallecursodocente.fechafinal){
      swal("Datos inválidos","Las fechas coinciden","error");return false
    }
    if((new Date(detallecursodocente.fechainicio.toString()).getTime()) > (new Date(detallecursodocente.fechafinal.toString()).getTime())){
      swal("Datos inválidos","La fecha inicial debe ser más antigua a la de finalización","error");return false
    }
    return true;
  }
}
