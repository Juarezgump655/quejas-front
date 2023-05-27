import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Queja } from 'src/app/componentes/Models/Queja';
import { QuejaService } from 'src/app/service/Queja.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resolver',
  templateUrl: './resolver.component.html',
  styleUrls: ['./resolver.component.css']
})
export class ResolverComponent implements OnInit {
  idQueja:number=0;
  resolverQuejaForm:FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ResolverComponent>,
    private formBuilder:FormBuilder,
    private tokenService: TokenService,
    private service: QuejaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.idQueja= data.idQueja;
    console.log(this.idQueja);

    this.resolverQuejaForm=this.formBuilder.group({
      resultadoSeguimiento:[null,Validators.required]
    })
  }

  ngOnInit() {
  }


  onCancelar(){
    this.dialogRef.close();
  }


  validarFormulario(){
    if(this.resolverQuejaForm.invalid){
      Swal.fire({
        titleText: `redacte el resultado correspondiente`,
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false
    })
    }else{
      this.resolverQueja();
    }
  }
  
  resolverQueja(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;

    const quejaResuelta: Queja={
      usuariomodifico: this.tokenService.getUserName(),
      fechamodificacion: desdeStr,
      fechaFinal: new Date(),
      idEstado:6,
      resultadoSeguimiento: this.resolverQuejaForm.get('resultadoSeguimiento')?.value

    }
    this.service.resolverQueja(this.idQueja,quejaResuelta).toPromise().then(QUEJA=>{
      Swal.fire({
        titleText: `Queja Resuelta Exitosamente`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
    }).then(()=>{
      
      window.location.href='dashboard/seguimiento-centralizador';
    })

    })


  }



}
