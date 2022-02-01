import { GradoService } from 'src/app/services/grado.service';
import { Gradocl } from 'src/app/models/gradocl';
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
  listGrado: Gradocl[] = [];
  displayedColumns: string[] = ['idcurso', 'descripcion', 'grado', 'nivel','estado'];
  dataSource = new MatTableDataSource(this.listCurso);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private curserv: CursoService, private graserv: GradoService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.idcurso +
        data.descripcion + data.idgrado.descripcion;
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
    this.listCurso = [];
    this.listGrado = [];
    this.graserv.getAll().subscribe({
      next: (grados)=>{
        this.listGrado = grados;
      }
    });
    this.curserv.getAll().subscribe({
      next: (cursos)=>{
        this.listCurso = cursos
        this.dataSource = new MatTableDataSource(this.listCurso);
        this.assignFilterPredicate();
        this.table.renderRows();
      }
    });
 
  }


  newCurso(){
    let selectgra= "<select id='selectgra' class='form-control'><option value=''>Seleccione un grado</option>";
    for(let gra of this.listGrado){
      selectgra+=`<option value='${gra.idgrado}'>${gra.descripcion}&nbsp;-&nbsp;${gra.idnivel.nombre}</option>`;
    }
    selectgra+="</select>"
    swal({
      title: "Registrar Curso",
      text: `
      <form>
        ${selectgra}
        <input id="descripcion" type="text" class="form-control" placeholder="Ej: Comunicacion" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const grado = <HTMLSelectElement>document.getElementById("selectgra");
      const desc = <HTMLInputElement>document.getElementById("descripcion");

      let regExpNames = new RegExp(/[a-zÀ-ÿ]{2,50}[a-zÀ-ÿ]/, "gi");
      
      (regExpNames.test(desc.value)) ? grado.value!=""?
          this.isvalidewNivel(grado.value,desc.value.toUpperCase())
          : swal("Campo inválido", "Seleccione un grado", "error").then(()=>{this.newCurso.call(this)})
        : swal("Campo inválido", "Mínimos 3 caracteres, No incluya números y más de un espacio en el campo descripcion", "error").then(()=>{this.newCurso.call(this)});

    }, () => { });
  }

  isvalidewNivel(idgrado:string,curso:string){
    let newCurso = new Cursocl();
    newCurso.estado = '1',
    newCurso.idgrado.idgrado = Number(idgrado);
    newCurso.descripcion = curso;
    this.curserv.create(newCurso).subscribe({
      next:(nsecc)=>{
        console.log(nsecc);
        swal("Registro exitoso","Se registró satisfactoriamente","success");
        this.load();
      }
    });

  }

  clickRow(curso:Cursocl){

    let selectgra= "<select id='selectgra' class='form-control'><option value=''>Seleccione un grado</option>";
    for(let gra of this.listGrado){
      if(curso.idgrado.idgrado == gra.idgrado)
      selectgra+=`<option value='${gra.idgrado}' selected>${gra.descripcion}&nbsp;-&nbsp;${gra.idnivel.nombre}</option>`;
      else selectgra+=`<option value='${gra.idgrado}'>${gra.descripcion}&nbsp;-&nbsp;${gra.idnivel.nombre}</option>`;
    }
    selectgra+="</select>"
    swal({
      title: "Actualizar Curso",
      text: `
      <form>
        ${selectgra}
        <input id="descripcion" type="text" class="form-control" placeholder="Ej: Comunicación" value="${curso.descripcion}" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const grado = <HTMLSelectElement>document.getElementById("selectgra");
      const desc = <HTMLInputElement>document.getElementById("descripcion");

      let regExpNames = new RegExp(/[a-zÀ-ÿ]{2,50}[a-zÀ-ÿ]/, "gi");
      
      (regExpNames.test(desc.value)) ? grado.value!=""?
          this.updateCurso(grado.value,desc.value.toUpperCase(),curso)
          : swal("Campo inválido", "Seleccione un grado", "error").then(()=>{this.clickRow.call(this,curso)})
        : swal("Campo inválido", "Mínimo 3 caracteres, No incluya números y más de un espacio en el campo descripción", "error").then(()=>{this.clickRow.call(this,curso)});

    }, () => { });
  }

  updateCurso(grado:string,desc:string,curso:Cursocl){
    curso.idgrado.idgrado = Number(grado);
    curso.descripcion = desc;
    this.curserv.update(curso).subscribe({
      next:(ncur)=>{
        console.log(ncur);
        swal("Actualización exitosa","Se actualizó satisfactoriamente","success");
        this.load();
      }
    });
  }

  
}
