import { DialogSeccionComponent } from './../dialog-seccion/dialog-seccion.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Anioescolarcl } from 'src/app/models/anioescolarcl';
import { AnioescolarService } from 'src/app/services/anioescolar.service';

declare var swal: any;

@Component({
  selector: 'app-anioescolar',
  templateUrl: './anioescolar.component.html',
  styleUrls: ['./anioescolar.component.css']
})
export class AnioescolarComponent implements OnInit {

  listAnios: Anioescolarcl[] = [];
  displayedColumns: string[] = ['idanio', 'nombre', 'fechainicio', 'fechacierre', 'estado'];
  dataSource = new MatTableDataSource(this.listAnios);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private anioserv: AnioescolarService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }


  // FILTRO DE BUSQUEDA
  assignFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) =>{
      let dataStr = data.idanio + data.nombre + data.fechainicio +
      data.fechacierre + data.estado;
      dataStr = dataStr.toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  load() {
    this.listAnios = [];
    this.anioserv.getAll().subscribe({
      next: (e) => { this.listAnios = e },
      error: () => { console.error("Error al recuperar lista de años escolares") },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.listAnios);
        this.assignFilterPredicate();
        this.table.renderRows();
        
      }
    });

  }

  clickRow(anio: Anioescolarcl) {
    console.log(anio);
    swal({
      title: "Actualizar Año Escolar",
      text: `
      <form>
        <input id="nombre" type="number" value="${anio.nombre}" class="form-control" placeholder="Año" required maxlength="4" />
        <input id="fechainicio" type="date" value="${anio.fechainicio}" class="form-control" placeholder="Fecha de Inicio" required/>
        <input id="fechacierre" type="date" value="${anio.fechacierre}" class="form-control" placeholder="Fecha de Cierre" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nombre = <HTMLInputElement>document.getElementById("nombre");
      const fechainicio = <HTMLInputElement>document.getElementById("fechainicio");
      const fechacierre = <HTMLInputElement>document.getElementById("fechacierre");

      let regExpNames = new RegExp(/^(201[0-9]|202[0-9]|203[0-9]|204[0-9]|205[0])$/);
      //let regExpFechas = new RegExp(/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(202[0-9]|203[0-9]|204[0-9]|205[0])$/);

      console.log(nombre.value);
      console.log("" + regExpNames.test(nombre.value));

      console.log(fechainicio.value + ", " + fechacierre.value);
      //console.log("" + regExpFechas.test(fechainicio.value) + ", " + regExpFechas.test(fechacierre.value));


      (regExpNames.test(nombre.value)) ? this.updateValidAnio(nombre.value, fechainicio.value, fechacierre.value, anio)
      //regExpFechas.test(fechainicio.value) && regExpFechas.test(fechacierre.value) ? this.updateValidAnio(nombre.value, fechainicio.value, fechacierre.value, anio)
        : swal("Campo inválido", "Verifique qué el año sea un número entre el rango de 2010 - 2050", "error")
        //: swal("Campo inválido", "No incluya letras y más de un espacio en los campos fecha de inicio y fecha de cierre", "error");

    }, () => { });
  }

  updateValidAnio(nombre: string, fechainicio: string, fechacierre: string, anios: Anioescolarcl) {
    anios.nombre = nombre;
    anios.fechainicio = fechainicio;
    anios.fechacierre = fechacierre;

    this.anioserv.update(anios).subscribe({
      next: () => {
        swal("Éxito", "El registro del año escolar se actualizó satisfactoriamente.", "success");
        this.load();
      }
    });
  }

  newAnio() {
    swal({
      title: "Registrar Año Escolar",
      text: `
      <form>
      <input id="nombre" type="text" class="form-control" placeholder="Año" required maxlength="4" />
      <input id="fechainicio" type="date" class="form-control" placeholder="Fecha de Inicio" required/>
      <input id="fechacierre" type="date" class="form-control" placeholder="Fecha de Cierre" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nombre = <HTMLInputElement>document.getElementById("nombre");
      const fechainicio = <HTMLInputElement>document.getElementById("fechainicio");
      const fechacierre = <HTMLInputElement>document.getElementById("fechacierre");

      let regExpNames = new RegExp(/^(201[0-9]|202[0-9]|203[0-9]|204[0-9]|205[0])$/);
      //let regExpFechas = new RegExp(/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(202[0-9]|203[0-9]|204[0-9]|205[0])$/);

      console.log(nombre.value);

      //console.log(fechainicio.value + ", " + fechacierre.value);
      //console.log("" + regExpFechas.test(fechainicio.value) + ", " + regExpFechas.test(fechacierre.value));


      (regExpNames.test(nombre.value)) ? this.isValidNewAnio(nombre.value, fechainicio.value, fechacierre.value)
        //regExpFechas.test(fechainicio.value) && regExpFechas.test(fechacierre.value) ? this.isValidNewAnio(nombre.value, fechainicio.value, fechacierre.value)
        //: swal("Campo inválido", "No incluya letras ni caracteres especiales en los campos, fecha de inicio y fecha de cierre", "error")
        : swal("Campo inválido", "Verifique qué el año sea un número entre el rango de 2010 - 2050", "error");
    }, () => { });

  }

  isValidNewAnio(nombre: string, fechainicio: string, fechacierre: string) {
        let newAnio: Anioescolarcl = new Anioescolarcl();
        newAnio.nombre = nombre;
        newAnio.fechainicio = fechainicio;
        newAnio.fechacierre = fechacierre;
        newAnio.estado = "1";
        this.anioserv.create(newAnio).subscribe({
          next: (anio: Anioescolarcl) => { if (anio != null) swal("Éxito", "El año escolar fue registrado satisfactoriamente", "success") },
          error: () => { swal("Lástima", "Ocurrió un error", "error"); console.log(newAnio) },
          complete: () => {
            this.load();
          }
        });
  }



}
