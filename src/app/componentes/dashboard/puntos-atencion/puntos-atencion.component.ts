import { AgregarPuntoComponent } from './agregar-punto/agregar-punto.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PuntosAtencion, traerPuntosAtencion, traerRegiones } from './../../Models/PuntosAtencion';
import { PuntosAtencionService } from './../../../service/PuntosAtencion.service';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { ModificarPuntoComponent } from './modificar-punto/modificar-punto.component';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-puntos-atencion',
  templateUrl: './puntos-atencion.component.html',
  styleUrls: ['./puntos-atencion.component.css']
})
export class PuntosAtencionComponent implements OnInit {
  
  traerRegiones:traerRegiones[]=[];
  listarPuntos: traerPuntosAtencion[]=[];
  //abrir y cerrar sidebar
  isSideNavCollapsed = false;
  screenWidth = 0;
  regionesForm: FormGroup;

  constructor(
    private service: PuntosAtencionService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog,
   
  ) { 
    this.regionesForm= this.formBuilder.group({
      idRegion:[null, Validators.required],
    })
   
  }

  ngOnInit(): void {

    this.obtenerRegiones();

  }


 

  //abrir y cerrar sidebar
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  //que las clases de css cambien dependiendo si el sidebar está desplegado o no
  getBodyClass(): string {
    let styleclass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleclass = 'body-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleclass = 'body-md-screen';
    }
    return styleclass;
  }

// logica del componente propiamente
obtenerRegiones(){
  this.traerRegiones=[];
  this.service.traerRegiones().subscribe((nombreRegion) => {
    this.traerRegiones= nombreRegion;
    console.log(this.traerRegiones);

  });

}






idRegionSelected:number=0;

traerTablaPuntos(idRegion:number){

  
  this.idRegionSelected=idRegion;
 
 this.service.traerPuntos(this.idRegionSelected).subscribe(puntos=> {
  this.listarPuntos =puntos;
  console.log(this.listarPuntos,"estos son los puntos de atención :")
 });

}



openDialog() {
  const dialogConfig = new MatDialogConfig();
  /* const dialogRef = this.dialog.open(AgregarPuntoComponent); */
  dialogConfig.maxWidth = '800px'; // establece el ancho máximo de la ventana a 800px
  dialogConfig.width = '600px'; // establece el ancho de la ventana a 600px
  const dialogRef= this.dialog.open(AgregarPuntoComponent, dialogConfig);
  
  dialogRef.afterClosed().subscribe(result => {
    console.log(this.idRegionSelected)
    if(this.idRegionSelected != 0){
      setTimeout(() => {
        this.traerTablaPuntos(this.idRegionSelected!);
        this.idRegionSelected=0;
        console.log("intenta hacer metodo");
      }, 2000); // espera 3 segundos (3000 milisegundos)
    }
  });
  
}




openDialogEditar(idPuntoAtencion: number,index: number){
  const dialogConfig = new MatDialogConfig();
 
  dialogConfig.maxWidth = '800px'; // establece el ancho máximo de la ventana a 800px
  dialogConfig.width = '600px';// establece el ancho de la ventana a 600px
  
  const registro = this.listarPuntos[index];
  dialogConfig.data = { idPuntoAtencion: idPuntoAtencion,registro:registro}; 

  const dialogRef= this.dialog.open(ModificarPuntoComponent, dialogConfig);
  
  dialogRef.afterClosed().subscribe(result => {
    console.log(this.idRegionSelected)
    console.log(result);
    
    if(this.idRegionSelected != 0){
      this.listarPuntos=[];
      setTimeout(() => {
        
        this.traerTablaPuntos(this.idRegionSelected!);
        
  
      }, 500); 
    }
  });
}





}
