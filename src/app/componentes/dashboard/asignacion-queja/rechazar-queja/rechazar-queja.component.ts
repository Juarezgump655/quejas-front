import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Queja } from 'src/app/componentes/Models/Queja';
import { QuejaService } from 'src/app/service/Queja.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rechazar-queja',
  templateUrl: './rechazar-queja.component.html',
  styleUrls: ['./rechazar-queja.component.css']
})
export class RechazarQuejaComponent implements OnInit {
  idQueja:number=0;
  rechazarQuejaForm:FormGroup;


  constructor(
    private dialogRef: MatDialogRef<RechazarQuejaComponent>,
    private service: QuejaService,
    private formBuilder:FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.idQueja= data.idQueja;

this.rechazarQuejaForm= this.formBuilder.group({
  justificacionRechazo:[null,Validators.required]
})

  }

  ngOnInit() {
  }


  onCancelar(){
    this.dialogRef.close();
  }

  alertar(){
    Swal.fire({
      title: '¿Está seguro de rechazar esta queja?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Rechazar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.validarFormulario();
      }else{
        this.dialogRef.close();
      }
    })
  }


  validarFormulario(){
    if(this.rechazarQuejaForm.invalid){
      Swal.fire({
        titleText: `Debe ingresar la justificacion correspondiente`,
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false
    })
    }else{
      this.rechazarQueja();
    }
  }

  rechazarQueja(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;


    const quejaRechazada: Queja={
      usuariomodifico: this.tokenService.getUserName(),
      fechamodificacion: desdeStr,
      idEstado:2,
      fechaFinal: new Date(),
      justificacionRechazo: this.rechazarQuejaForm.get('justificacionRechazo')?.value
    }

    this.service.asignarPunto(this.idQueja,quejaRechazada).toPromise().then(QUEJA=>{
      Swal.fire({
        titleText: `Queja Rechazada Exitosamente`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
    }).then(()=>{
      
      window.location.href='dashboard/asignacion-queja';
    })
  
    })

  }

}
