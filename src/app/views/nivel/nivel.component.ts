import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Nivelcl } from 'src/app/models/nivelcl';
import { NivelService } from 'src/app/services/nivel.service';

declare var swal: any;

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrls: ['./nivel.component.css']
})
export class NivelComponent implements OnInit {

  listNivel: Nivelcl[] = [];
  displayedColumns: string[] = ['idnivel', 'nombre', 'estado'];
  dataSource = new MatTableDataSource(this.listNivel);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private nivelserv: NivelService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.idnivel +
        data.nombre;
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
    this.listNivel = [];
    this.nivelserv.getAll().subscribe({
      next: (e) => { this.listNivel = e },
      error: () => { console.error("Error al recuperar lista de niveles") },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.listNivel);
        this.assignFilterPredicate();
        this.table.renderRows();
        
      }
    });

  }

  clickRow(niv: Nivelcl) {
    console.log(niv);
    swal({
      title: "Actualizar Nivel",
      text: `
      <form>
        <input id="nombre" type="text" value="${niv.nombre}" class="form-control" placeholder="Nombre" minlength="3" required/>
        
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nombre = <HTMLInputElement>document.getElementById("nombre");

      let regExp = new RegExp(/^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/, "i");

      console.log(nombre.value);

      (regExp.test(nombre.value) ? this.updateValidNivel(nombre.value.split(" "),niv)
      
        : swal("Campo inválido", "Mínimo 3 caracteres, no incluya más de un espacio ni números en el campo nombre", "error")

    )}, () => { })
  }

  updateValidNivel(nombre: string[], nive: Nivelcl) {
    nive.nombre = nombre.reduce((acc, curr) => acc + " " + curr, "").trim();

    this.nivelserv.update(nive).subscribe({
      next: () => {
        swal("Éxito", "El registro del nivel se actualizó satisfactoriamente.", "success");
        this.load();
      }
    });
  }

  newNivel() {
    swal({
      title: "Registrar Nivel",
      text: `
      <form>
        <input id="nombre" type="text" class="form-control" placeholder="Nombre" required/>
        
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nombre = <HTMLInputElement>document.getElementById("nombre");

      let regExp = new RegExp(/^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/, "i");

      console.log(nombre.value)
      console.log("" + regExp.test(nombre.value));

      (regExp.test(nombre.value) ? this.isValidNewNivel(nombre.value.split(" "))
      
        : swal("Campo inválido", "Mínimo 3 caracteres, No incluya más de un espacio ni números en el campo nombre", "error")

    )}, () => { })

  }

  isValidNewNivel(nombre: string[]) {
        let newNiv: Nivelcl = new Nivelcl();
        newNiv.nombre = nombre.reduce((acc, next) => acc + " " + next, "").trim();
        newNiv.estado = "1";
        this.nivelserv.create(newNiv).subscribe({
          next: (niv: Nivelcl) => { if (niv != null) swal("Éxito", "El nivel fue registrado satisfactoriamente", "success") },
          error: () => { swal("Lástima", "Ocurrió un error", "error"); console.log(newNiv) },
          complete: () => {
            this.load();
          }
        });
  }



}
