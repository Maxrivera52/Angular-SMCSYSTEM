import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Periodocl } from 'src/app/models/periodocl';
import { PeriodoService } from 'src/app/services/periodo.service';
import { Anioescolarcl } from 'src/app/models/anioescolarcl';
import { AnioescolarService } from 'src/app/services/anioescolar.service';

declare var swal: any;

class PeriodoAnio {
  periodo: Periodocl = new Periodocl();
  anio:Anioescolarcl = new Anioescolarcl();
}

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  listPeriodo: Periodocl[] = [];
  listAnio: Anioescolarcl[] = [];
  listPeriodoAnio: PeriodoAnio[] = [];
  displayedColumns: string[] = ['idperiodo', 'nombre', 'fechainicio', 'fechacierre', 'anio', 'estado'];
  dataSource = new MatTableDataSource(this.listPeriodoAnio);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private perserv: PeriodoService, private anioserv: AnioescolarService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.periodo.idperiodo +
        data.periodo.nombre + data.periodo.fechainicio + data.periodo.fechacierre + data.anio.nombre;
      dataStr = dataStr.toLowerCase();
      console.log(dataStr);
      return dataStr.indexOf(filter) != -1;
    }
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  load(){
    this.listPeriodo = [];
    this.listAnio = [];
    this.listPeriodoAnio= [];
    this.anioserv.getAll().subscribe({
      next: (anios)=>{
        this.listAnio = anios;
        this.perserv.getAll().subscribe({
          next: (periodos)=>{
            periodos.forEach(el=>{
              let perAnio = new PeriodoAnio();
              perAnio.periodo = el;
              perAnio.anio = this.listAnio.filter(x=>x.idanio == el.idanio)[0];
              this.listPeriodoAnio.push(perAnio);
            });
            this.dataSource = new MatTableDataSource(this.listPeriodoAnio);
            this.assignFilterPredicate();
            this.table.renderRows();
          }
        });
      }
    });
 
  }


  newPeriodo(){
    let selectanio= "<select id='selectanio' class='form-control'><option value=''>Seleccione un Año</option>";
    for(let anio of this.listAnio){
      selectanio+=`<option value='${anio.idanio}'>${anio.nombre}</option>`;
    }
    selectanio+="</select>"
    swal({
      title: "Registrar Periodo Escolar",
      text: `
      <form>
        ${selectanio}
        <input id="nombre" type="text" class="form-control" placeholder="Ej: 1er Bimestre" required/>
        <input id="fechainicio" type="date" class="form-control" placeholder="Fecha de Inicio" required/>
        <input id="fechacierre" type="date" class="form-control" placeholder="Fecha de Cierre" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const anio = <HTMLSelectElement>document.getElementById("selectanio");
      const nom = <HTMLInputElement>document.getElementById("nombre");
      const fechainicio = <HTMLInputElement>document.getElementById("fechainicio");
      const fechacierre = <HTMLInputElement>document.getElementById("fechacierre");

      let regExpNames = new RegExp(/^[A-Za-z0-9 ]{5,50}/, "i");
      
      (regExpNames.test(nom.value)) ? anio.value!=""?
          this.isvalidewPeriodo(anio.value,nom.value.toUpperCase(),fechainicio.value, fechacierre.value)
          : swal("Campo inválido", "Seleccione un año", "error").then(()=>{this.newPeriodo.call(this)})
        : swal("Campo inválido", "Mínimos 5 caracteres, No incluya más de un espacio en el campo periodo", "error").then(()=>{this.newPeriodo.call(this)});

    }, () => { });
  }

  isvalidewPeriodo(idanio:string,periodo:string, fechainicio:string, fechacierre:string){
    let newPeriodo = new Periodocl();
    newPeriodo.estado = '1',
    newPeriodo.idanio = Number(idanio);
    newPeriodo.nombre = periodo;
    newPeriodo.fechainicio = fechainicio;
    newPeriodo.fechacierre = fechacierre;
    this.perserv.create(newPeriodo).subscribe({
      next:(nper)=>{
        console.log(nper);
        swal("Registro exitoso","Se registró satisfactoriamente","success");
        this.load();
      }
    });

  }

  clickRow(periodo:PeriodoAnio){

    let selectanio= "<select id='selectanio' class='form-control'><option value=''>Seleccione un año</option>";
    for(let anio of this.listAnio){
      if(periodo.anio.idanio == anio.idanio)
      selectanio+=`<option value='${anio.idanio}' selected>${anio.nombre}</option>`;
      else selectanio+=`<option value='${anio.idanio}'>${anio.nombre}</option>`;
    }
    selectanio+="</select>"
    swal({
      title: "Actualizar Periodo Escolar",
      text: `
      <form>
        ${selectanio}
        <input id="nombre" type="text" class="form-control" placeholder="Ej: 1er Bimestre" value="${periodo.periodo.nombre}" required/>
        <input id="fechainicio" type="date" class="form-control" placeholder="Fecha de Inicio" value="${periodo.periodo.fechainicio}" required/>
        <input id="fechacierre" type="date" class="form-control" placeholder="Fecha de Cierre" value="${periodo.periodo.fechacierre}" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const anio = <HTMLSelectElement>document.getElementById("selectanio");
      const nom = <HTMLInputElement>document.getElementById("nombre");
      const fechainicio = <HTMLInputElement>document.getElementById("fechainicio");
      const fechacierre = <HTMLInputElement>document.getElementById("fechacierre");

      let regExpNames = new RegExp(/^[A-Za-z0-9 ]{5,50}/, "i");
      
      (regExpNames.test(nom.value)) ? anio.value!=""?
          this.updatePeriodo(anio.value,nom.value.toUpperCase(),fechainicio.value, fechacierre.value,periodo)
          : swal("Campo inválido", "Seleccione un año", "error").then(()=>{this.clickRow.call(this,periodo)})
        : swal("Campo inválido", "Mínimo 5 caracteres, No incluya más de un espacio en el campo periodo", "error").then(()=>{this.clickRow.call(this,periodo)});

    }, () => { });
  }

  updatePeriodo(anio:string,nom:string,fechainicio:string, fechacierre:string, periodo:PeriodoAnio){
    periodo.periodo.idanio = Number(anio);
    periodo.periodo.nombre = nom;
    periodo.periodo.fechainicio = fechainicio;
    periodo.periodo.fechacierre = fechacierre;
    this.perserv.update(periodo.periodo).subscribe({
      next:(nper)=>{
        console.log(nper);
        swal("Actualización exitosa","Se actualizó satisfactoriamente","success");
        this.load();
      }
    });
  }


}
