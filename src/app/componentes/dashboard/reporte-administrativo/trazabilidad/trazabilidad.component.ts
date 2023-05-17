import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { trazabilidadTable } from 'src/app/componentes/Models/Trazabilidad';
import { QuejaService } from 'src/app/service/Queja.service';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.css'],
})
export class TrazabilidadComponent implements OnInit {
  presentadaSelected = true;
  asignadaSelected = true;
  analisisSelected = false;
  procedenteSelected = false;
  seguimientoSelected = false;
  finalizadaSelected = false;

  correlativo: string = '';
  constructor(private quejaServicio: QuejaService) {}
  trazabilidad: trazabilidadTable[] = [];
  ngOnInit() {
    console.log(this.correlativo);
    this.obtenerTrazabilidad();
  }

  obtenerTrazabilidad() {
    this.quejaServicio.getTrazabiliad(this.correlativo).subscribe((dato) => {
      this.trazabilidad = dato;
      console.log(dato);

      for (let i = 0; i < this.trazabilidad.length; i++) {
        const item = this.trazabilidad[i];
        this.analisisSelected = this.trazabilidad.some(item => item.estadosSolicitud === 2);
        this.procedenteSelected = this.trazabilidad.some(item => item.estadosSolicitud === 4);
        this.seguimientoSelected = this.trazabilidad.some(item => item.estadosSolicitud === 5);
        this.finalizadaSelected = this.trazabilidad.some(item => item.estadosSolicitud === 6); 
      }
    });
  }
}
