import { Queja } from './../../../Models/Queja';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { traerPuntosAtencion, traerRegiones } from 'src/app/componentes/Models/PuntosAtencion';
import { fichaQueja } from 'src/app/componentes/Models/Queja';
import { PuntosAtencionService } from 'src/app/service/PuntosAtencion.service';
import { QuejaService } from 'src/app/service/Queja.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-queja',
  templateUrl: './asignar-queja.component.html',
  styleUrls: ['./asignar-queja.component.css']
})
export class AsignarQuejaComponent implements OnInit {
  idQueja:number=0;
  fichaQueja?: fichaQueja;

  listaRegiones:traerRegiones[]=[];
  listaPuntos:traerPuntosAtencion[]=[];
  asignarPuntoForm:FormGroup;

  puntoAtencionView:boolean=false;
  habilitarAsignacion:boolean=false;
  
  constructor(
    private service: QuejaService,
    private dialogRef: MatDialogRef<AsignarQuejaComponent>,
    private formBuilder:FormBuilder,
    private traerRegionesService: PuntosAtencionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenService: TokenService,
    private router: Router
  ) { 
    this.idQueja= data.idQueja;
    console.log(this.idQueja);

    this.asignarPuntoForm=this.formBuilder.group({
      idPuntoAsignado:[null, Validators.required],
      

    })

  }

  ngOnInit() {
    this.traerDatosFicha();
    this.traerRegiones();
  }

  onCancelar(){
    this.dialogRef.close();
  }

  traerDatosFicha(){
    this.service.fichaQueja(this.idQueja).subscribe(ficha=>{
      this.fichaQueja=ficha;
      console.log(this.fichaQueja);
    })
  }


  traerRegiones(){
    this.traerRegionesService.traerRegiones().subscribe(regiones=>{
      this.listaRegiones=regiones;
      
    })
  }


  traerPuntos(idRegion:number){
    this.traerRegionesService.traerPuntos(idRegion).subscribe(puntos=>{
      this.listaPuntos=puntos;
      this.puntoAtencionView=true;
    })
  }


  validarFormulario(){
    if(this.asignarPuntoForm.invalid){
      Swal.fire({
        titleText: `Ingrese el punto de atencion a Asignar`,
        icon: 'error',
        showCloseButton: true,
        showConfirmButton: false
    })
    }else{
      this.asignarQueja();
    }
  }

  asignarQueja(){
    let fecha = new Date();
    let desdeStr = `${fecha.getDate()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${fecha.getFullYear()}`;
    const quejaAsignada: Queja={
      idPuntoAsignado: this.asignarPuntoForm.get('idPuntoAsignado')?.value ,
      usuariomodifico: this.tokenService.getUserName(),
      fechamodificacion: desdeStr,
      idEstado:2
    }

  this.service.asignarPunto(this.idQueja,quejaAsignada).toPromise().then(QUEJA=>{
    Swal.fire({
      titleText: `Queja Asignada Exitosamente`,
      icon: 'success',
      showCloseButton: true,
      showConfirmButton: false
  }).then(()=>{
    window.location.href='dashboard/asignacion-queja';
  })

  })


  }




}
