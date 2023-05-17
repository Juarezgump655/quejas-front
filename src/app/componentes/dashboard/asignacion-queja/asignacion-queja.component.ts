import { tablaAsignacionQueja } from './../../Models/Queja';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuejaService } from 'src/app/service/Queja.service';
import { RechazarQuejaComponent } from './rechazar-queja/rechazar-queja.component';
import { AsignarQuejaComponent } from './asignar-queja/asignar-queja.component';
import Swal from 'sweetalert2';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-asignacion-queja',
  templateUrl: './asignacion-queja.component.html',
  styleUrls: ['./asignacion-queja.component.css']
})
export class AsignacionQuejaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  Queja: tablaAsignacionQueja[]=[];


  constructor(
    private service: QuejaService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.traerQuejas();
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



  traerQuejas(){
  this.service.tablaAsignacionQueja().subscribe(quejas=>{
    this.Queja=quejas;
    console.log(this.Queja);
  })
  }

  
  alertar(){
    Swal.fire({
      title: '¿Está seguro de que quiere rechazar este registro?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.openDialogRechazar();
      }else{
  
      }
    })
  }

  openDialogRechazar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px'; 
  dialogConfig.width = '600px';
  const dialogRef= this.dialog.open(RechazarQuejaComponent, dialogConfig);
  }

  openDialogAsignar(idQueja:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1200px'; 
  dialogConfig.width = '800px';
  dialogConfig.data={idQueja:idQueja};
  const dialogRef= this.dialog.open(AsignarQuejaComponent, dialogConfig);
  }


}
