import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { traerPuntosAtencion, traerRegiones } from 'src/app/componentes/Models/PuntosAtencion';
import { fichaQueja } from 'src/app/componentes/Models/Queja';
import { PuntosAtencionService } from 'src/app/service/PuntosAtencion.service';
import { QuejaService } from 'src/app/service/Queja.service';

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

  puntoAtencionView:boolean=false;
  habilitarAsignacion:boolean=false;
  
  constructor(
    private service: QuejaService,
    private dialogRef: MatDialogRef<AsignarQuejaComponent>,
    private traerRegionesService: PuntosAtencionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.idQueja= data.idQueja;
    console.log(this.idQueja);
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





}
