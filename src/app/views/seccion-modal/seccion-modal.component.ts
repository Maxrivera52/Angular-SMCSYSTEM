import { GradoService } from 'src/app/services/grado.service';
import { Gradocl } from 'src/app/models/gradocl';
import { SeccionService } from 'src/app/services/seccion.service';
import { Seccioncl } from 'src/app/models/seccioncl';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-seccion-modal',
  templateUrl: './seccion-modal.component.html',
  styleUrls: ['./seccion-modal.component.css']
})
export class SeccionModalComponent implements OnInit {

  seccion!: Seccioncl;
  grado!: Gradocl[];
  constructor(
    private dialogRef: MatDialogRef<SeccionModalComponent>,
    private gradoService: GradoService,
    private seccionService: SeccionService,
    @Inject(MAT_DIALOG_DATA) private data: Seccioncl
  ) { }

  ngOnInit(): void {
    this.seccion = new Seccioncl();
    this.seccion.idseccion=this.data.idseccion;
    this.seccion.descripcion=this.data.descripcion;
    this.seccion.estado=this.data.estado;
    this.seccion.idgrado=this.data.idgrado;

    this.gradoService.getAll().subscribe(data =>{
      this.grado=data;
    })
  }

  aceptar(){
    if(this.seccion != null && this.seccion.idseccion >0){
      this.seccionService.update(this.seccion).subscribe(()=>{
        return this.seccionService.getAll().subscribe(data=>{
          this.seccionService.seccionActualizar.next(data);
        })
      });
    }else{
      this.seccionService.create(this.seccion).subscribe(()=>{
        this.seccionService.getAll().subscribe(data =>{
          this.seccionService.seccionActualizar.next(data);
        })
      })
    }
    
    this.cerrar()
  }

  cerrar(){
    this.dialogRef.close();
  }

}
