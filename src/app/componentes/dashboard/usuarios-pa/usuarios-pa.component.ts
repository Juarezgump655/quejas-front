
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/Usuario.service';
import { Usuario, tablaUsuario } from '../../Models/usuario';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';

interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-usuarios-pa',
  templateUrl: './usuarios-pa.component.html',
  styleUrls: ['./usuarios-pa.component.css']
})
export class UsuariosPaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  public elementosPorPagina = 10;
  public paginaActual = 1;
  listaUsuarios: tablaUsuario[] = [];


  constructor(
   private service: UsuarioService,
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
    return this.listaUsuarios.slice(inicio, fin);
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
    return Math.ceil(this.listaUsuarios.length / this.elementosPorPagina);
  }


  traerLista(){
    this.service.tablaUsuario().subscribe(dato=>{
      this.listaUsuarios= dato;
      console.log(this.listaUsuarios)
    })
      }


      openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.maxWidth = '2000px'; // establece el ancho máximo de la ventana a 800px
        dialogConfig.width = '1000px'; // establece el ancho de la ventana a 600px
      
       this.dialog.open(AgregarUsuarioComponent, dialogConfig);

      
      }
      

      openDialogEditar(idUsuario: number, index: number){
        const dialogConfig = new MatDialogConfig();
       
        dialogConfig.maxWidth = '1500px'; // establece el ancho máximo de la ventana a 800px
        dialogConfig.width = '1000px';// establece el ancho de la ventana a 600px
       const registro= this.listaUsuarios[index];
       dialogConfig.data = { idUsuario:idUsuario, registro:registro}; 
      this.dialog.open(ModificarUsuarioComponent, dialogConfig);
       

      }

}
