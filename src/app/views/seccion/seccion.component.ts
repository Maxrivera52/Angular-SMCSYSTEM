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
  listgrades: Gradocl[] = [];

  displayedColumns: string[] = ['idseccion', 'grado', 'descripcion','nivel',  'estado'];
  dataSource = new MatTableDataSource(this.listSeccion);


  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(private secserv: SeccionService, private gserv: GradoService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  // FILTRO DE BUSQUEDA
  assignFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) =>{
      let dataStr = data.descripcion + data.idgrado.descripcion
      dataStr = dataStr.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.listSeccion = [];
    this.listgrades = [];
    this.gserv.getAll().subscribe({
      next: (grades)=>{
        this.listgrades = grades;
      }
    });
    this.secserv.getAll().subscribe({
      next: (secc)=>{
        this.listSeccion = secc
        this.dataSource = new MatTableDataSource(this.listSeccion);
        this.assignFilterPredicate();
        this.table.renderRows();
      }
    });
 
  }

  newSection(){
    let selectgrad= "<select id='selectgrad' class='form-control'><option value=''>Seleccione un grado</option>";
    for(let grad of this.listgrades){
      selectgrad+=`<option value='${grad.idgrado}'>${grad.descripcion}&nbsp;-&nbsp;${grad.idnivel.nombre}</option>`;
    }
    selectgrad+="</select>"
    swal({
      title: "Registrar Secci??n",
      text: `
      <form>
        ${selectgrad}
        <input id="descripcion" type="text" class="form-control" placeholder="Ej: A12" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const grado = <HTMLSelectElement>document.getElementById("selectgrad");
      const desc = <HTMLInputElement>document.getElementById("descripcion");

      let regExpNames = new RegExp(/^\w$/, "i");
      
      (regExpNames.test(desc.value)) ? grado.value!=""?
          this.isvalidewSection(grado.value,desc.value.toUpperCase())
          : swal("Campo inv??lido", "Seleccione un grado", "error").then(()=>{this.newSection.call(this)})
        : swal("Campo inv??lido", "Complete la descripci??n de la secci??n con solo una letra", "error").then(()=>{this.newSection.call(this)});

    }, () => { });
  }

  isvalidewSection(idgrado:string,seccion:string){
    let newSection = new Seccioncl();
    newSection.estado = '1',
    newSection.idgrado.idgrado = Number(idgrado);
    newSection.descripcion = seccion;
    this.secserv.create(newSection).subscribe({
      next:(nsecc)=>{
        console.log(nsecc);
        swal("Registro exitoso","Se registr?? satisfactoriamente","success");
        this.load();
      }
    });
  }

  openModal(seccion:Seccioncl){
    let selectgrad= "<select id='selectgrad' class='form-control'><option value=''>Seleccione un grado</option>";
    for(let grad of this.listgrades){
      if(seccion.idgrado.idgrado == grad.idgrado)
      selectgrad+=`<option value='${grad.idgrado}' selected>${grad.descripcion}&nbsp;-&nbsp;${grad.idnivel.nombre}</option>`;
      else selectgrad+=`<option value='${grad.idgrado}'>${grad.descripcion}&nbsp;-&nbsp;${grad.idnivel.nombre}</option>`;
    }
    selectgrad+="</select>"
    swal({
      title: "Actualizar Secci??n",
      text: `
      <form>
        ${selectgrad}
        <input id="descripcion" type="text" class="form-control" placeholder="Ej: A12" value="${seccion.descripcion}" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const grado = <HTMLSelectElement>document.getElementById("selectgrad");
      const desc = <HTMLInputElement>document.getElementById("descripcion");

      let regExpNames = new RegExp(/^\w$/, "i");
      
      (regExpNames.test(desc.value)) ? grado.value!=""?
          this.updateSection(grado.value,desc.value.toUpperCase(),seccion)
          : swal("Campo inv??lido", "Seleccione un grado", "error").then(()=>{this.openModal.call(this,seccion)})
        : swal("Campo inv??lido", "Complete la descripci??n de la secci??n con solo una letra", "error").then(()=>{this.openModal.call(this,seccion)});

    }, () => { });
  }

  updateSection(grado:string,desc:string,seccion:Seccioncl){
    seccion.idgrado.idgrado = Number(grado);
    seccion.descripcion = desc;
    this.secserv.update(seccion).subscribe({
      next:(nsecc)=>{
        console.log(nsecc);
        swal("Actualizaci??n exitosa","Se actualiz?? satisfactoriamente","success");
        this.load();
      }
    });
  }

  /*onDelete(id:number){
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
    
  }*/

}
