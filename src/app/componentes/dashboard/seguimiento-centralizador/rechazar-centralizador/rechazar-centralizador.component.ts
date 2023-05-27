import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Queja, puntoAsignadoCentralizador } from 'src/app/componentes/Models/Queja';
import { QuejaService } from 'src/app/service/Queja.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rechazar-centralizador',
  templateUrl: './rechazar-centralizador.component.html',
  styleUrls: ['./rechazar-centralizador.component.css']
})
export class RechazarCentralizadorComponent implements OnInit {
  idQueja:number=0;
  rechazarQuejaForm:FormGroup;
  idPunto:number=0;

  constructor(
    private dialogRef: MatDialogRef<RechazarCentralizadorComponent>,
    private formBuilder:FormBuilder,
    private tokenService: TokenService,
    private service: QuejaService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.idQueja= data.idQueja;

    this.rechazarQuejaForm=this.formBuilder.group({
      justificacionRechazo:[null,Validators.required]
    })
  }

  ngOnInit() {
    this.obtenerPunto();
  }

  onCancelar(){
    this.dialogRef.close();
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

  obtenerPunto(){
    this.service.asignarPuntoCentralizador(this.idQueja).subscribe(data=>{
      this.idPunto= data;
      console.log(this.idPunto)
    })
  }


rechazarQueja(){
  let fecha = new Date();
  let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

  const quejaResuelta: Queja={
    usuariomodifico: this.tokenService.getUserName(),
    fechamodificacion: desdeStr,
    idPuntoAsignado:this.idPunto,
    resultadoSeguimiento: this.rechazarQuejaForm.get('resultadoSeguimiento')?.value

  }

  this.service.resolverQueja(this.idQueja,quejaResuelta).toPromise().then(data=>{
    Swal.fire({
      titleText: `Queja Reasignada Exitosamente`,
      icon: 'success',
      showCloseButton: true,
      showConfirmButton: false
  }).then(()=>{
    
    window.location.href='dashboard/seguimiento-centralizador';
  })

  })
}

}
