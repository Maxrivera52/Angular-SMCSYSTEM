import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-seccion',
  templateUrl: './dialog-seccion.component.html',
  styleUrls: ['./dialog-seccion.component.css']
})
export class DialogSeccionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSeccionComponent> 
  ) { }

  ngOnInit(): void {
  }

  onEliminar(){
    this.dialogRef.close(true);
  }

  onCancelar(){
    this.dialogRef.close(false);
  }

}
