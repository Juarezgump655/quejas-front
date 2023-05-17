import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuejaService } from 'src/app/service/Queja.service';
import { fichaQueja } from 'src/app/componentes/Models/Queja';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RechazarQuejaComponent } from '../rechazar-queja/rechazar-queja.component';
import { AsignarQuejaComponent } from '../asignar-queja/asignar-queja.component';
import Swal from 'sweetalert2';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  isSideNavCollapsed=false;
  screenWidth: number = 0;

  idQueja:number=0;
  fichaQueja?: fichaQueja;

  constructor(
    private route: ActivatedRoute,
    private service: QuejaService,
    public dialog: MatDialog
  ) { 

    this.route.queryParams.subscribe(params => {
      this.idQueja = params['idQueja']
    });
  }

  ngOnInit() {
    this.traerDatosFicha();
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


  traerDatosFicha(){
    this.service.fichaQueja(this.idQueja).subscribe(ficha=>{
      this.fichaQueja=ficha;
      console.log(this.fichaQueja);
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

  openDialogAsignar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1200px'; 
  dialogConfig.width = '800px';
  dialogConfig.data={idQueja:this.idQueja}
  const dialogRef= this.dialog.open(AsignarQuejaComponent, dialogConfig);
  
  
  }



}
