import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Profesor } from 'src/app/models/profesor';
import { Usuario } from 'src/app/models/usuario';
import { SprofesorService } from 'src/app/services/sprofesor.service';
import { SUsuarioService } from 'src/app/services/susuario.service';

declare var swal: any;

class ProfesorUsuario {
  profesor: Profesor = new Profesor();
  usuario: Usuario = new Usuario();
}

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  listProfesor: Profesor[] = [];
  listProfesorUsuario: ProfesorUsuario[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'correo', 'telefono', 'estado'];
  dataSource = new MatTableDataSource(this.listProfesorUsuario);

  @ViewChild(MatTable)
  table!: MatTable<any>;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private profserv: SprofesorService, private userserv: SUsuarioService, private changdet: ChangeDetectorRef) {
    this.assignFilterPredicate();
  }

  ngOnInit(): void {
    this.load();
  }

  assignFilterPredicate(){
    this.dataSource.filterPredicate = (data, filter) => {
      let dataStr = data.profesor.idprofesor +
        data.profesor.nombre +
        data.profesor.apellido + data.profesor.telefono + 
        data.usuario.correo + data.profesor.dni;
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
    this.listProfesor = [];
    this.listProfesorUsuario = [];
    this.profserv.getAll().subscribe({
      next: (e) => { this.listProfesor = e },
      error: () => { console.error("Error al recuperar lista de profesores") },
      complete: () => {

        for (let prof of this.listProfesor) {
          let profU = new ProfesorUsuario();
          profU.profesor = prof;

          this.userserv.getById(prof.idusuario).subscribe({
            next: (usr) => { profU.usuario = usr; },
            complete: () => { }
          });
          this.listProfesorUsuario.push(profU);

        }
        this.dataSource = new MatTableDataSource(this.listProfesorUsuario);
        this.assignFilterPredicate();
        this.table.renderRows();
        
      }
    });

  }

  clickRow(prof: ProfesorUsuario) {
    console.log(prof);
    swal({
      title: "Actualizar Docente",
      text: `
      <form>
        <input id="nombre" type="text" value="${prof.profesor.nombre}" class="form-control" placeholder="Nombre" required/>
        <input id="apellido" type="text" value="${prof.profesor.apellido}" class="form-control" placeholder="Apellido" required/>
          <input id="dni" type="number" value="${prof.profesor.dni}" class="form-control" placeholder="DNI" maxlength="8" required/>
          <input id="telefono" type="tel" value="${prof.profesor.telefono}" class="form-control ml-4" placeholder="Teléfono" required/>
        <input id="correo" type="email" value="${prof.usuario.correo}" class="form-control" placeholder="Correo electrónico" required/>
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
      const correo = <HTMLInputElement>document.getElementById("correo");

      let regExpNames = new RegExp(/^[a-zÀ-ÿ]+ {0,2}[a-zÀ-ÿ]*$/, "i");
      let regExpDni = new RegExp(/^\d{8}$/);
      let regExpTel = new RegExp(/^(\+(51))? ?\d{9}$/);
      let regExpEmail = new RegExp(/^\w+@(gmail.com|outlook.es|hotmail.com)$/);

      console.log(dni.value)

    console.log(nombre.value + ", " + apellido.value);
      console.log("" + regExpNames.test(nombre.value) + ", " + regExpNames.test(apellido.value));

      (regExpNames.test(nombre.value) && regExpNames.test(apellido.value)) ?
        regExpDni.test(dni.value) ? regExpTel.test(telefono.value) ? regExpEmail.test(correo.value) ? this.updateValidProfesor(nombre.value.split(" "), apellido.value.split(" "), correo.value, dni.value, telefono.value, prof)
          : swal("Campo inválido", "Verifique que el email esté correctamente escrito. Solo se aceptan correos personales, no empresariales.", "error")
          : swal("Campo inválido", "Verifique qué el numero telefónico esté bien escrito, y de ser posible asemejarse a \"+51 999999999\"", "error")
          : swal("Campo inválido", "El DNI debe contener unicamente 8 dígitos numéricos", "error")
        : swal("Campo inválido", "No incluya números y más de un espacio en los campos nombres y apellidos", "error");

    }, () => { });
  }

  updateValidProfesor(nombre: string[], apellido: string[], correo: string, dni: string, telefono: string, proUs: ProfesorUsuario) {
    proUs.profesor.nombre = nombre.reduce((acc, curr) => acc + " " + curr, "").trim();
    proUs.profesor.apellido = apellido.reduce((acc, curr) => acc + " " + curr, "").trim();
    proUs.profesor.dni = dni;
    proUs.profesor.telefono = telefono;
//    proUs.usuario.nombre = nombre[0] + " " + apellido[0];
    proUs.usuario.correo = correo;

    this.userserv.save(proUs.usuario).subscribe({ complete: () => { console.log("use updated") } });
    this.profserv.update(proUs.profesor).subscribe({
      next: () => {
        swal("Éxito", "El registro del profesor se actualizó satisfactoriamente.", "success");
        this.load();
      }
    });
  }

  newProfesor() {
    swal({
      title: "Registrar Docente",
      text: `
      <form>
        <input id="nombre" type="text" class="form-control" placeholder="Nombre" required/>
        <input id="apellido" type="text" class="form-control" placeholder="Apellido" required/>
          <input id="dni" type="number" class="form-control" placeholder="DNI" maxlength="8" required/>
          <input id="telefono" type="tel" class="form-control ml-4" placeholder="Teléfono" required/>
        <input id="correo" type="email" class="form-control" placeholder="Correo electrónico" required/>
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
      const correo = <HTMLInputElement>document.getElementById("correo");

      let regExpNames = new RegExp(/^[a-z]+ {0,2}[a-z]*$/, "i");
      let regExpDni = new RegExp(/^\d{8}$/);
      let regExpTel = new RegExp(/^(\+(51)){0,1} {0,1}\d{9}$/);
      let regExpEmail = new RegExp(/^\w+@(gmail.com|outlook.es|hotmail.com)$/);

      console.log(dni.value)

      console.log(nombre.value + ", " + apellido.value);
      console.log("" + regExpNames.test(nombre.value) + ", " + regExpNames.test(apellido.value));

      (regExpNames.test(nombre.value) && regExpNames.test(apellido.value)) ?
        regExpDni.test(dni.value) ? regExpTel.test(telefono.value) ? regExpEmail.test(correo.value) ? this.isValidNewProfesor(nombre.value.split(" "), apellido.value.split(" "), correo.value, dni.value, telefono.value)
          : swal("Campo inválido", "Verifique que el email esté correctamente escrito. Solo se aceptan correos personales, no empresariales.", "error")
          : swal("Campo inválido", "Verifique qué el numero telefónico esté bien escrito, y de ser posible asemejarse a \"+51 999999999\"", "error")
          : swal("Campo inválido", "El DNI debe contener unicamente 8 dígitos numéricos", "error")
        : swal("Campo inválido", "No incluya números y más de un espacio en los campos nombres y apellidos", "error");

    }, () => { });

  }

  isValidNewProfesor(nombre: string[], apellido: string[], correo: string, dni: string, telefono: string) {
    let usuario = new Usuario();
    usuario.correo = correo;
    usuario.clave = dni;
    usuario.estado = "1";
    usuario.idrol.idrol = 2;
    let returnUser: Usuario = new Usuario();
    this.userserv.save(usuario).subscribe({
      next: (user) => { returnUser = user }, complete: () => {
        let newProf: Profesor = new Profesor();
        newProf.nombre = nombre.reduce((acc, next) => acc + " " + next, "").trim();
        newProf.apellido = apellido.reduce((acc, next) => acc + " " + next, "").trim();
        newProf.dni = dni;
        newProf.telefono = telefono;
        newProf.estado = "1";
        newProf.idusuario = returnUser.idusuario;
        this.profserv.save(newProf).subscribe({
          next: (prof: Profesor) => { if (prof != null) swal("Éxito", "El profesor fue registrado satisfactoriamente", "success") },
          error: () => { swal("Lástima", "Ocurrió un error", "error"); console.log(newProf) },
          complete: () => {
            this.load();
          }
        });
      }
    });
  }
}

