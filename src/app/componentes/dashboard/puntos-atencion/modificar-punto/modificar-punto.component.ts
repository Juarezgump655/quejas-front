import { modificarPunto } from './../../../Models/PuntosAtencion';
import { PuntosAtencionService } from 'src/app/service/PuntosAtencion.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'src/app/service/token.service';
import { PuntosAtencion } from 'src/app/componentes/Models/PuntosAtencion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-punto',
  templateUrl: './modificar-punto.component.html',
  styleUrls: ['./modificar-punto.component.css']
})
export class ModificarPuntoComponent implements OnInit {

  idPuntoAtencion: number;
  contadorUsuarios: any;
  registro: any;

  constructor(private service: PuntosAtencionService,
    private dialogRef: MatDialogRef<ModificarPuntoComponent>,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.idPuntoAtencion = data.idPuntoAtencion;
       this.registro=data.registro; 
       console.log(this.registro);
    }

  formularioparaModificar = new FormGroup({
    nombrePuntoAtencion: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
   
  })

  ngOnInit() {
    this.contarUsuarios();
  }



  contarUsuarios(){
    this.service.contadorUsuarios(this.idPuntoAtencion).toPromise().then(contador=>{
      this.contadorUsuarios=contador;
      console.log(this.contadorUsuarios);
    
    })
    
  }



  validarFormulario(){
    if(this.formularioparaModificar.valid){
      this.validarEstado();
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete los campos obligatorios.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  

  validarEstado() {
    const valorEstado= this.formularioparaModificar.get('estado')?.value ? 1 : 2;
    console.log('El valor del estado es: ', valorEstado);
    

    if(valorEstado === 2){
      if(this.contadorUsuarios.count === 0){
        this.modificarPunto();
      }else{
        Swal.fire({
          title: 'Advertencia',
          text: 'Existen '+ this.contadorUsuarios.count + ' usuarios asociados al punto de atención, TODOS los usuarios serán automáticamente Inactivados. ¿Continua con el proceso de Inactivación del Punto de Atención? ',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, continuar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.modificarPunto();
          }else{
            this.dialogRef.close();
          }
        });
      }
     
    }else if(valorEstado ===1){
      this.modificarPunto();
    }
  } 




 
  modificarPunto(){
    

    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;




    const puntoModificado: PuntosAtencion={
      idPuntoAtencion: this.idPuntoAtencion,
      nombrePuntoAtencion: this.formularioparaModificar.get('nombrePuntoAtencion')?.value,
      fechamodificacion: desdeStr,
      usuariomodifico: this.tokenService.getUserName(),
      estado: this.formularioparaModificar.get('estado')?.value ? 1 : 2,
      
    }


    this.service.modificarPunto(this.idPuntoAtencion,puntoModificado).toPromise().then(PUNTO=>{
      Swal.fire({
        titleText: `Datos Actualizados`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
    });
    
  })
  }



  

  onCancelar(): void {

    this.dialogRef.close();
  }

  


}
