import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Cursocl } from 'src/app/models/cursocl';
import { CursoService } from 'src/app/services/curso.service';

declare var swal: any;

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  listCurso: Cursocl[] = [];
  displayedColumns: string[] = ['idcurso', 'descripcion', 'estado'];
  dataSource = new MatTableDataSource(this.listCurso);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private curserv: CursoService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.idcurso +
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
    this.listCurso = [];
    this.curserv.getAll().subscribe({
      next: (e) => { this.listCurso = e },
      error: () => { console.error("Error al recuperar lista de cursos") },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.listCurso);
        this.assignFilterPredicate();
        this.table.renderRows();
        
      }
    });

  }

  clickRow(cur: Cursocl) {
    console.log(cur);
    swal({
      title: "Actualizar Curso",
      text: `
      <form>
        <input id="descripcion" type="text" value="${cur.descripcion}" class="form-control" placeholder="Descripcion" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const descripcion = <HTMLInputElement>document.getElementById("descripcion");

      let regExp = new RegExp(/^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/, "i");

      console.log(descripcion.value);

      (regExp.test(descripcion.value) ? this.updateValidCurso(descripcion.value.split(" "),cur)
      
        : swal("Campo inválido", "No incluya números y más de un espacio en el campo descripcion", "error")

    )}, () => { })
  }

  updateValidCurso(descripcion: string[], curs: Cursocl) {
    curs.descripcion = descripcion.reduce((acc, curr) => acc + " " + curr, "").trim();

    this.curserv.update(curs).subscribe({
      next: () => {
        swal("Éxito", "El registro del curso se actualizó satisfactoriamente.", "success");
        this.load();
      }
    });
  }

  newCurso() {
    swal({
      title: "Registrar Curso",
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

      let regExp = new RegExp(/^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/, "i");

      console.log(descripcion.value)
      console.log("" + regExp.test(descripcion.value));

      (regExp.test(descripcion.value) ? this.isValidNewCurso(descripcion.value.split(" "))
      
        : swal("Campo inválido", "No incluya números y más de un espacio en el campo descripcion", "error")

    )}, () => { })

  }

  isValidNewCurso(descripcion: string[]) {
        let newCur: Cursocl = new Cursocl();
        newCur.descripcion = descripcion.reduce((acc, next) => acc + " " + next, "").trim();
        newCur.estado = "1";
        this.curserv.create(newCur).subscribe({
          next: (cur: Cursocl) => { if (cur != null) swal("Éxito", "El curso fue registrado satisfactoriamente", "success") },
          error: () => { swal("Lástima", "Ocurrió un error", "error"); console.log(newCur) },
          complete: () => {
            this.load();
          }
        });
      }
}
