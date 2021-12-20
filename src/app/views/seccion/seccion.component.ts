import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Seccioncl } from 'src/app/models/seccioncl';
import { Gradocl } from 'src/app/models/gradocl';
import { SeccionService } from 'src/app/services/seccion.service';
import { GradoService } from 'src/app/services/grado.service';

declare var swal: any;

class seccionGrado {
  seccion:Seccioncl = new Seccioncl();
  grado:Gradocl = new Gradocl();
}

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.css']
})
export class SeccionComponent implements OnInit {

  listSeccion: Seccioncl[] = [];
  listSeccionGrade:seccionGrado[] = [];
  listgrades: Gradocl[] = [];

  displayedColumns: string[] = ['idseccion', 'descripcion', 'grado', 'estado'];
  dataSource = new MatTableDataSource(this.listSeccionGrade);


  @ViewChild(MatTable)
  table!: MatTable<any>;

  constructor(private secserv: SeccionService, private gserv: GradoService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  // FILTRO DE BUSQUEDA
  assignFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) =>{
      let dataStr = data.grado.descripcion + data.seccion.descripcion
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
    this.listSeccionGrade = [];
    this.gserv.getAll().subscribe({
      next: (grades)=>{
        this.listgrades = grades;
        this.secserv.getAll().subscribe({
          next: (secc)=>{
            secc.forEach(el=>{
              let seccGrade = new seccionGrado();
              seccGrade.seccion = el;
              seccGrade.grado = this.listgrades.filter(x=>x.idgrado == el.idgrado)[0];
              this.listSeccionGrade.push(seccGrade);
            });
            this.dataSource = new MatTableDataSource(this.listSeccionGrade);
            this.assignFilterPredicate();
            this.table.renderRows();
          }
        });
      }
    });
 
  }

  newSection(){
    let selectgrad= "<select id='selectgrad' class='form-control'><option value=''>Seleccione un grado</option>";
    for(let grad of this.listgrades){
      selectgrad+=`<option value='${grad.idgrado}'>${grad.descripcion}</option>`;
    }
    selectgrad+="</select>"
    swal({
      title: "Nueva Sección",
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

      let regExpNames = new RegExp(/^\w+$/, "i");
      
      (regExpNames.test(desc.value)) ? grado.value!=""?
          this.isvalidewSection(grado.value,desc.value.toUpperCase())
          : swal("Campo inválido", "Seleccione un grado", "error").then(()=>{this.newSection.call(this)})
        : swal("Campo inválido", "Complete la descripción de la sección con solo una letra", "error").then(()=>{this.newSection.call(this)});

    }, () => { });
  }

  isvalidewSection(idgrado:string,seccion:string){
    let newSection = new Seccioncl();
    newSection.estado = '1',
    newSection.idgrado = Number(idgrado);
    newSection.descripcion = seccion;
    this.secserv.create(newSection).subscribe({
      next:(nsecc)=>{
        console.log(nsecc);
        swal("Registro exitoso","Se registró satisfactoriamente","success");
        this.load();
      }
    });

  }

  openModal(seccion:seccionGrado){

    let selectgrad= "<select id='selectgrad' class='form-control'><option value=''>Seleccione un grado</option>";
    for(let grad of this.listgrades){
      if(seccion.grado.idgrado == grad.idgrado)
      selectgrad+=`<option value='${grad.idgrado}' selected>${grad.descripcion}</option>`;
      else selectgrad+=`<option value='${grad.idgrado}'>${grad.descripcion}</option>`;
    }
    selectgrad+="</select>"
    swal({
      title: "Nueva Sección",
      text: `
      <form>
        ${selectgrad}
        <input id="descripcion" type="text" class="form-control" placeholder="Ej: A" value="${seccion.seccion.descripcion}" required/>
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
          this.updateSection(grado.value,desc.value.toUpperCase(),seccion)
          : swal("Campo inválido", "Seleccione un grado", "error").then(()=>{this.openModal.call(this,seccion)})
        : swal("Campo inválido", "Complete la descripción de la sección con solo una letra", "error").then(()=>{this.openModal.call(this,seccion)});

    }, () => { });
  }

  updateSection(grado:string,desc:string,seccion:seccionGrado){
    seccion.seccion.idgrado = Number(grado);
    seccion.seccion.descripcion = desc;
    this.secserv.update(seccion.seccion).subscribe({
      next:(nsecc)=>{
        console.log(nsecc);
        swal("Actualización exitosa","Se actualizó satisfactoriamente","success");
        this.load();
      }
    });
  }

  onDelete(id:number){
    /*
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
    */
  }

}
