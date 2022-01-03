import { NivelService } from 'src/app/services/nivel.service';
import { Nivelcl } from 'src/app/models/nivelcl';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Gradocl } from 'src/app/models/gradocl';
import { GradoService } from 'src/app/services/grado.service';

declare var swal: any;

class GradoNiv {
  grado: Gradocl = new Gradocl();
  nivel:Nivelcl = new Nivelcl();
}
@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent implements OnInit {

  listGrado: Gradocl[] = [];
  listNivel: Nivelcl[] = [];
  listGradoNiv: GradoNiv[] = [];
  displayedColumns: string[] = ['idgrado', 'descripcion', 'nivel', 'estado'];
  dataSource = new MatTableDataSource(this.listGradoNiv);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private gradoserv: GradoService, private nivserv: NivelService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.grado.idgrado +
        data.grado.descripcion + data.nivel.nombre;
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
    this.listGrado = [];
    this.listNivel = [];
    this.listGradoNiv = [];
    this.nivserv.getAll().subscribe({
      next: (niveles)=>{
        this.listNivel = niveles;
        this.gradoserv.getAll().subscribe({
          next: (grades)=>{
            grades.forEach(el=>{
              let gradNiv = new GradoNiv();
              gradNiv.grado = el;
              gradNiv.nivel = this.listNivel.filter(x=>x.idnivel == el.idnivel)[0];
              this.listGradoNiv.push(gradNiv);
            });
            this.dataSource = new MatTableDataSource(this.listGradoNiv);
            this.assignFilterPredicate();
            this.table.renderRows();
          }
        });
      }
    });
 
  }

  newGrado(){
    let selectniv= "<select id='selectniv' class='form-control'><option value=''>Seleccione un nivel</option>";
    for(let niv of this.listNivel){
      selectniv+=`<option value='${niv.idnivel}'>${niv.nombre}</option>`;
    }
    selectniv+="</select>"
    swal({
      title: "Registrar Grado",
      text: `
      <form>
        ${selectniv}
        <input id="descripcion" type="text" class="form-control" placeholder="Ej: Primero" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#00a62c',
      confirmButtonText: 'Guardar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nivel = <HTMLSelectElement>document.getElementById("selectniv");
      const desc = <HTMLInputElement>document.getElementById("descripcion");

      let regExpNames = new RegExp(/^[A-Za-z0-9 ]{3,60}/, "i");
      
      (regExpNames.test(desc.value)) ? nivel.value!=""?
          this.isvalidewNivel(nivel.value,desc.value.toUpperCase())
          : swal("Campo inválido", "Seleccione un nivel", "error").then(()=>{this.newGrado.call(this)})
        : swal("Campo inválido", "Mínimo 3 caracteres, no incluya más de un espacio en el campo descripcion", "error").then(()=>{this.newGrado.call(this)});

    }, () => { });
  }

  isvalidewNivel(idnivel:string,grado:string){
    let newGrado = new Gradocl();
    newGrado.estado = '1',
    newGrado.idnivel = Number(idnivel);
    newGrado.descripcion = grado;
    this.gradoserv.create(newGrado).subscribe({
      next:(nsecc)=>{
        console.log(nsecc);
        swal("Registro exitoso","Se registró satisfactoriamente","success");
        this.load();
      }
    });

  }


  clickRow(grado:GradoNiv){

    let selectniv= "<select id='selectniv' class='form-control'><option value=''>Seleccione un nivel</option>";
    for(let niv of this.listNivel){
      if(grado.nivel.idnivel == niv.idnivel)
      selectniv+=`<option value='${niv.idnivel}' selected>${niv.nombre}</option>`;
      else selectniv+=`<option value='${niv.idnivel}'>${niv.nombre}</option>`;
    }
    selectniv+="</select>"
    swal({
      title: "Actualizar Grado",
      text: `
      <form>
        ${selectniv}
        <input id="descripcion" type="text" class="form-control" placeholder="Ej: Primero" value="${grado.grado.descripcion}" required/>
      </form>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Actualizar',
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).catch(swal.snoop).then(() => {
      const nivel = <HTMLSelectElement>document.getElementById("selectniv");
      const desc = <HTMLInputElement>document.getElementById("descripcion");

      let regExpNames = new RegExp(/^[A-Za-z0-9 ]{3,60}/, "i");
      
      (regExpNames.test(desc.value)) ? nivel.value!=""?
          this.updateGrado(nivel.value,desc.value.toUpperCase(),grado)
          : swal("Campo inválido", "Seleccione un nivel", "error").then(()=>{this.clickRow.call(this,grado)})
        : swal("Campo inválido", "Mínimo 3 caracteres, no incluya más de un espacio en el campo descripcion", "error").then(()=>{this.clickRow.call(this,grado)});

    }, () => { });
  }

  updateGrado(nivel:string,desc:string,grado:GradoNiv){
    grado.grado.idnivel = Number(nivel);
    grado.grado.descripcion = desc;
    this.gradoserv.update(grado.grado).subscribe({
      next:(nsecc)=>{
        console.log(nsecc);
        swal("Actualización exitosa","Se actualizó satisfactoriamente","success");
        this.load();
      }
    });
  }

  
  //ELIMINAR GRADO
  /*delete(grado: Gradocl): void {
    console.log("Inhabilitar Grado");

    this.gradoserv.delete(grado.idgrado).subscribe(
      res => this.gradoserv.getAll().subscribe(data =>{
        //this.dataSource = new MatTableDataSource(data);
  }))}*/

}
