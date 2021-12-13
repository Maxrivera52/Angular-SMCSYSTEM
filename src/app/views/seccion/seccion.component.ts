import { SeccionModalComponent } from './../seccion-modal/seccion-modal.component';
import { DialogSeccionComponent } from './../dialog-seccion/dialog-seccion.component';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Seccioncl } from 'src/app/models/seccioncl';
import { Gradocl } from 'src/app/models/gradocl';
import { SeccionService } from 'src/app/services/seccion.service';
import { GradoService } from 'src/app/services/grado.service';

declare var swal: any;

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {

  listSeccion: Seccioncl[] = [];
  displayedColumns: string[] = ['idseccion', 'descripcion', 'estado', 'idgrado', 'editar'];
  dataSource = new MatTableDataSource(this.listSeccion);


  constructor(private dialog: MatDialog, private secserv: SeccionService, private gserv: GradoService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  // FILTRO DE BUSQUEDA
  assignFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) =>{
      let dataStr = data.idseccion + data.descripcion
      dataStr = dataStr.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.secserv.seccionActualizar.subscribe( data =>{
      this.dataSource = new MatTableDataSource(data);
    });

    this.secserv.getAll().subscribe( data =>{
      this.dataSource = new MatTableDataSource(data);
    });
  }


  openModal(seccion?: Seccioncl){
    let sec=seccion != null? seccion:new Seccioncl();
    this.dialog.open(SeccionModalComponent,{
      width: '260px',
      data:sec
    })
  }

  onDelete(id:number){
    let dialogRef = this.dialog.open(DialogSeccionComponent,{
      //disableClose:true
    });
    dialogRef.afterClosed().subscribe(estado =>{
      if(estado){
        this.secserv.delete(id).subscribe(()=>{
          this.secserv.getAll().subscribe(data =>{
            this.dataSource = new MatTableDataSource(data);
          })
        })
      }
    })
  }


}
