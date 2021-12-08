import { DialogSeccionComponent } from './../dialog-seccion/dialog-seccion.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumnocl } from 'src/app/models/alumnocl';

declare var swal: any;
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  listAlumno: Alumnocl[] = [];
  displayedColumns: string[] = ['idalumno', 'nombre', 'apellido', 'dni', 'telefono', 'estado'];
  dataSource = new MatTableDataSource(this.listAlumno);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dialog: MatDialog, private aluserv: AlumnoService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }


  // FILTRO DE BUSQUEDA
  assignFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) =>{
      let dataStr = data.idalumno + data.nombre + data.apellido +
      data.dni + data.telefono + data.estado;
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
    this.listAlumno = [];
    this.aluserv.getAll().subscribe({
      next: (e) => { this.listAlumno = e },
      error: () => { console.error("Error al recuperar lista de alumnos") },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.listAlumno);
        this.assignFilterPredicate();
        this.table.renderRows();
        
      }
    });

  }

  clickRow(alu: Alumnocl) {
    console.log(alu);
    swal({
      title: "Actualizar Alumno",
      text: `
      <form>
        <input id="nombre" type="text" value="${alu.nombre}" class="form-control" placeholder="Nombre" required/>
        <input id="apellido" type="text" value="${alu.apellido}" class="form-control" placeholder="Apellido" required/>
        <input id="dni" type="number" value="${alu.dni}" class="form-control" placeholder="DNI" maxlength="8" required/>
        <input id="telefono" type="tel" value="${alu.telefono}" class="form-control ml-4" placeholder="Teléfono" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nombre = <HTMLInputElement>document.getElementById("nombre");
      const apellido = <HTMLInputElement>document.getElementById("apellido");
      const dni = <HTMLInputElement>document.getElementById("dni");
      const telefono = <HTMLInputElement>document.getElementById("telefono");

      let regExpNames = new RegExp(/^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/, "i");
      let regExpDni = new RegExp(/^\d{8}$/);
      let regExpTel = new RegExp(/^(\+(51))? ?\d{9}$/);

      console.log(dni.value)

      console.log(nombre.value + ", " + apellido.value);
      console.log("" + regExpNames.test(nombre.value) + ", " + regExpNames.test(apellido.value));

      (regExpNames.test(nombre.value) && regExpNames.test(apellido.value)) ?
        regExpDni.test(dni.value) ? regExpTel.test(telefono.value) ? this.updateValidAlumno(nombre.value.split(" "), apellido.value.split(" "), dni.value, telefono.value, alu)
        : swal("Campo inválido", "Verifique qué el numero telefónico esté bien escrito, y de ser posible asemejarse a \"+51 987654321\"", "error")
        : swal("Campo inválido", "El DNI debe contener unicamente 8 dígitos numéricos", "error")
        : swal("Campo inválido", "No incluya números y más de un espacio en los campos nombres y apellidos", "error");

    }, () => { });
  }

  updateValidAlumno(nombre: string[], apellido: string[], dni: string, telefono: string, alum: Alumnocl) {
    alum.nombre = nombre.reduce((acc, curr) => acc + " " + curr, "").trim();
    alum.apellido = apellido.reduce((acc, curr) => acc + " " + curr, "").trim();
    alum.dni = dni;
    alum.telefono = telefono;

    this.aluserv.update(alum).subscribe({
      next: () => {
        swal("Éxito", "El registro del alumno se actualizó satisfactoriamente.", "success");
        this.load();
      }
    });
  }

  newAlumno() {
    swal({
      title: "Registrar Alumno",
      text: `
      <form>
      <input id="nombre" type="text" class="form-control" placeholder="Nombre" required/>
      <input id="apellido" type="text" class="form-control" placeholder="Apellido" required/>
      <input id="dni" type="number" class="form-control" placeholder="DNI" maxlength="8" required/>
      <input id="telefono" type="tel" class="form-control ml-4" placeholder="Teléfono" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nombre = <HTMLInputElement>document.getElementById("nombre");
      const apellido = <HTMLInputElement>document.getElementById("apellido");
      const dni = <HTMLInputElement>document.getElementById("dni");
      const telefono = <HTMLInputElement>document.getElementById("telefono");

      let regExpNames = new RegExp(/^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/, "i");
      let regExpDni = new RegExp(/^\d{8}$/);
      let regExpTel = new RegExp(/^(\+(51))? ?\d{9}$/);

      console.log(dni.value)

      console.log(nombre.value + ", " + apellido.value);
      console.log("" + regExpNames.test(nombre.value) + ", " + regExpNames.test(apellido.value));


      (regExpNames.test(nombre.value) && regExpNames.test(apellido.value)) ?
        regExpDni.test(dni.value) ? regExpTel.test(telefono.value) ? this.isValidNewAlumno(nombre.value.split(" "), apellido.value.split(" "), dni.value, telefono.value)
        : swal("Campo inválido", "Verifique qué el numero telefónico esté bien escrito, y de ser posible asemejarse a \"+51 987654321\"", "error")
        : swal("Campo inválido", "El DNI debe contener unicamente 8 dígitos numéricos", "error")
        : swal("Campo inválido", "No incluya números y más de un espacio en los campos nombres y apellidos", "error");

    }, () => { });

  }

  isValidNewAlumno(nombre: string[], apellido: string[], dni: string, telefono: string) {
        let newAlu: Alumnocl = new Alumnocl();
        newAlu.nombre = nombre.reduce((acc, next) => acc + " " + next, "").trim();
        newAlu.apellido = apellido.reduce((acc, next) => acc + " " + next, "").trim();
        newAlu.dni = dni;
        newAlu.telefono = telefono;
        newAlu.estado = "1";
        this.aluserv.create(newAlu).subscribe({
          next: (alu: Alumnocl) => { if (alu != null) swal("Éxito", "El alumno fue registrado satisfactoriamente", "success") },
          error: () => { swal("Lástima", "Ocurrió un error", "error"); console.log(newAlu) },
          complete: () => {
            this.load();
          }
        });
      }

      onDelete(id:number){
        let dialogRef = this.dialog.open(DialogSeccionComponent,{
          //disableClose:true
        });
        dialogRef.afterClosed().subscribe(estado =>{
          if(estado){
            this.aluserv.delete(id).subscribe(()=>{
              this.aluserv.getAll().subscribe(data =>{
                this.dataSource = new MatTableDataSource(data);
              })
            })
          }
        })
      }

  //ELIMINAR ALUMNO
  /*delete(alu: Alumnocl): void {
    console.log("Inhabilitar Alumno");

    this.aluserv.delete(alu.idalumno).subscribe(
      res => this.aluserv.getAll().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
  }))}*/
}