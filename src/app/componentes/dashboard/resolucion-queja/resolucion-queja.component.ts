import { Component, OnInit } from '@angular/core';
import { QuejaService } from 'src/app/service/Queja.service';
import { QuejaProjection } from '../../Models/Queja';
import { FileServiceService } from 'src/app/service/FileService.service';
import { TokenService } from 'src/app/service/token.service';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-resolucion-queja',
  templateUrl: './resolucion-queja.component.html',
  styleUrls: ['./resolucion-queja.component.css']
})
export class ResolucionQuejaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  constructor(
    private quejaServicio:QuejaService,
      private fileServicio: FileServiceService,
      public tokenService: TokenService
  ) { }
  public elementosPorPagina = 5;
  public paginaActual = 1;
  listaQuejas: QuejaProjection[] = [];
  ngOnInit() {
    this.listarQuejas();
  }
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  //Metodos para la paginacion
  public obtenerElementosPorPagina(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.listaQuejas.slice(inicio, fin);
  }

  //Metodos para la paginacion
  public retrocederPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }
  
  //Metodos para la paginacion
  public avanzarPagina(): void {
    if (this.paginaActual < this.numeroDePaginas()) {
      this.paginaActual++;
    }
  }
  //Metodos para la paginacion
  
  public numeroDePaginas(): number {
    return Math.ceil(this.listaQuejas.length / this.elementosPorPagina);
  }
  getBodyClass(): string {
    let styleclass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleclass = 'body-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleclass = 'body-md-screen';
    }
    return styleclass;
  }


  listarQuejas(){
    const puntoAtencionLong: number = parseInt(this.tokenService.getPuntoAtencion(), 10);
    console.log(puntoAtencionLong);
    this.quejaServicio.ListarQuejaSeguimientoPA(puntoAtencionLong).subscribe(dato => {
      this.listaQuejas = dato;
      console.log(this.listaQuejas);
    });
  }
  verDocumentos(){

  }







}
