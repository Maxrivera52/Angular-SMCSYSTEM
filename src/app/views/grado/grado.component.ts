import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Gradocl } from 'src/app/models/gradocl';
import { GradoService } from 'src/app/services/grado.service';

declare var swal: any;
@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {

  listGrado: Gradocl[] = [];
  displayedColumns: string[] = ['idgrado', 'descripcion', 'estado'];
  dataSource = new MatTableDataSource(this.listGrado);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private gradoserv: GradoService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.idgrado +
        data.descripcion;
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

  load() {
    this.listGrado = [];
    this.gradoserv.getAll().subscribe({
      next: (e) => { this.listGrado = e },
      error: () => { console.error("Error al recuperar lista de grados") },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.listGrado);
        this.assignFilterPredicate();
        this.table.renderRows();
        
      }
    });

  }

  clickRow(gra: Gradocl) {
    console.log(gra);
    swal({
      title: "Actualizar Grado",
      text: `
      <form>
        <input id="descripcion" type="text" value="${gra.descripcion}" class="form-control" placeholder="Descripcion" required/>
        
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const descripcion = <HTMLInputElement>document.getElementById("descripcion");

      let regExp = new RegExp(/^[A-Za-z0-9\s]{3,60}/g);

      console.log(descripcion.value);

      (regExp.test(descripcion.value) ? this.updateValidGrado(descripcion.value.split(" "),gra)
      
        : swal("Campo inválido", "Mínimo 3 caracteres, no incluya más de un espacio en el campo descripcion", "error")

    )}, () => { })
  }

  updateValidGrado(descripcion: string[], grad: Gradocl) {
    grad.descripcion = descripcion.reduce((acc, curr) => acc + " " + curr, "").trim();

    this.gradoserv.update(grad).subscribe({
      next: () => {
        swal("Éxito", "El registro del grado se actualizó satisfactoriamente.", "success");
        this.load();
      }
    });
  }

  newGrado() {
    swal({
      title: "Registrar Grado",
      text: `
      <form>
        <input id="descripcion" type="text" class="form-control" placeholder="Descripcion" required/>
        
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const descripcion = <HTMLInputElement>document.getElementById("descripcion");

      let regExp = new RegExp(/^[A-Za-z0-9 ]{3,60}/, "i");

      console.log(descripcion.value)
      console.log("" + regExp.test(descripcion.value));

      (regExp.test(descripcion.value) ? this.isValidNewGrado(descripcion.value.split(" "))
      
        : swal("Campo inválido", "No incluya más de un espacio en el campo descripcion", "error")

    )}, () => { })

  }

  isValidNewGrado(descripcion: string[]) {
        let newGra: Gradocl = new Gradocl();
        newGra.descripcion = descripcion.reduce((acc, next) => acc + " " + next, "").trim();
        newGra.estado = "1";
        this.gradoserv.create(newGra).subscribe({
          next: (gra: Gradocl) => { if (gra != null) swal("Éxito", "El grado fue registrado satisfactoriamente", "success") },
          error: () => { swal("Lástima", "Ocurrió un error", "error"); console.log(newGra) },
          complete: () => {
            this.load();
          }
        });
      }

  //ELIMINAR GRADO
  delete(grado: Gradocl): void {
    console.log("Inhabilitar Grado");

    this.gradoserv.delete(grado.idgrado).subscribe(
      res => this.gradoserv.getAll().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
  }))}

}
