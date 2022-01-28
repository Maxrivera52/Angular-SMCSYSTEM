import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { SUsuarioService } from 'src/app/services/susuario.service';

declare var swal:any;

@Component({
  selector: 'app-recovery-user-account',
  templateUrl: './recovery-user-account.component.html',
  styleUrls: ['./recovery-user-account.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RecoveryUserAccountComponent implements OnInit {

  isEditable = false;
  @ViewChild('stepper')
  private myStepper!: MatStepper;

  constructor(private SUsuario:SUsuarioService,private router:Router) { }

  ngOnInit(): void {
    
  }
  goBack(){
    this.myStepper.previous();
  }

  goForward(){
    let index = this.myStepper._getFocusIndex();
    const emailInput = <HTMLInputElement>document.getElementById("emailInput");
    const inputKeyCode = <HTMLInputElement> document.getElementById("keycode");
    const password1 = <HTMLInputElement> document.getElementById("password1");
    const password2 = <HTMLInputElement> document.getElementById("password2");
    let email =  emailInput.value;
    let keycode = inputKeyCode.value;
    let pass1 = password1.value;
    let pass2 = password2.value;
    console.log(index)
    if(index==0){

      this.SUsuario.sendRecoveryEmail(email).subscribe(res=>{
        console.log(res);
        if(res=="nonregistered"){
          swal("Ocurrió un problema","Email de usuario no encontrado","error");
        }else if(res=="sended"){
          swal("Email verificado","Le hemos enviado un correo electrónico con un código de acceso","success");
          this.myStepper.next();
        }
      });
    }else if(index==1){
      this.SUsuario.verifyKeyCode(email,keycode).subscribe(res=>{
        if(res=="nonregistered"){
          swal("Ocurrió un problema","Email de usuario no encontrado","error");
        }else if(res=="nonverificated"){
          swal("Ocurrió un problema","Verifique que el código ingresado sea exactamente igual al enviado a su correo","success");
          inputKeyCode.value="";
        }else if(res=="verificated"){
          swal("Verificado","El código ha sido verificado con éxito","success");
          this.myStepper.next();
        }
      });
    }else if(index==2){
      if (pass1.length < 8 || pass2.length < 8){
        swal("Campo inválido","La contraseña debe tener más de 8 caracteres","error");
        return;
      }
      if (pass1 != pass2){
        swal("Campo inválido","La contraseñas deben ser iguales","error");
        return;
      }
      console.log("pass if")
      this.SUsuario.recoverUserWithCredentials(email, keycode,pass2).subscribe(
        next=>{
          console.log(next);
          if(next=="error"){
            swal("Ocurrió un problema","No se pudo reestablecer su contraseña. Comuníquese con su equipo de TI","error");
            return;
          }else if(next=="success"){
            swal({title:"Reestablecimiento exitoso",
            text:"Su contraseña se reestableció correctamente",
            type:"success",
            allowOutsideClick: false
          }).catch(swal.snoop).then(()=>{
              this.router.navigate(['/login']);
            });
            
          }
        }
      );
    }

  
  }
    
}
