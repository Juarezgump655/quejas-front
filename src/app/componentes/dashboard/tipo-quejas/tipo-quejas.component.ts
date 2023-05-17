import { ModificarTipoComponent } from './modificar-tipo/modificar-tipo.component';
import { Component, OnInit } from '@angular/core';
import { TipoQuejaList } from '../../Models/TIpoQueja';
import { TipoQuejaService } from 'src/app/service/tipoQueja.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarTipoComponent } from './agregar-tipo/agregar-tipo.component';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-tipo-quejas',
  templateUrl: './tipo-quejas.component.html',
  styleUrls: ['./tipo-quejas.component.css']
})
export class TipoQuejasComponent implements OnInit {

  isSideNavCollapsed=false;
  screenWidth: number = 0;
  public elementosPorPagina = 5;
  public paginaActual = 1;
  listaTipoQuejas: TipoQuejaList[] = [];

  constructor(
    private service: TipoQuejaService,
    public dialog: MatDialog

  ) { }

  ngOnInit() {
    this.traerLista();
  }


  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
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

  public obtenerElementosPorPagina(): any[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.listaTipoQuejas.slice(inicio, fin);
  }


  public retrocederPagina(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }
  
  public avanzarPagina(): void {
    if (this.paginaActual < this.numeroDePaginas()) {
      this.paginaActual++;
    }
  }

  public numeroDePaginas(): number {
    return Math.ceil(this.listaTipoQuejas.length / this.elementosPorPagina);
  }


  traerLista(){
this.service.traerTipoQueja().subscribe(dato=>{
  this.listaTipoQuejas = dato;
})
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px'; // establece el ancho máximo de la ventana a 800px
    dialogConfig.width = '600px'; // establece el ancho de la ventana a 600px
   this.dialog.open(AgregarTipoComponent, dialogConfig);
  
  
  }

  openDialogEditar(idTipoQueja: number,index:number){
    const dialogConfig = new MatDialogConfig();
   
    dialogConfig.maxWidth = '800px'; // establece el ancho máximo de la ventana a 800px
    dialogConfig.width = '600px';// establece el ancho de la ventana a 600px
    
    const registro= this.listaTipoQuejas[index];// obtiene datos del registro seleccionado a traves de la variable que tiene el array
    dialogConfig.data = { idTipoQueja: idTipoQueja, registro: registro}; 
    this.dialog.open(ModificarTipoComponent, dialogConfig);

  

  }






}
