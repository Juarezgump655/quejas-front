import { Component, OnInit } from '@angular/core';
import { tablaSeguimiento } from '../../Models/Queja';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QuejaService } from 'src/app/service/Queja.service';
import { ResolverComponent } from './resolver/resolver.component';
import { RechazarCentralizadorComponent } from './rechazar-centralizador/rechazar-centralizador.component';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-seguimiento-centralizador',
  templateUrl: './seguimiento-centralizador.component.html',
  styleUrls: ['./seguimiento-centralizador.component.css']
})
export class SeguimientoCentralizadorComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;

  Queja: tablaSeguimiento[]=[];



  constructor(
    private service: QuejaService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.traerTabla();
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

  traerTabla(){
    this.service.tablaCentralizadorSeguimiento().subscribe(data=>{
      this.Queja=data;
    })
  }

  openDialogRechazar(idQueja:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px'; 
  dialogConfig.width = '600px';
  dialogConfig.data={idQueja:idQueja};
  const dialogRef= this.dialog.open(RechazarCentralizadorComponent, dialogConfig);
  }

  openDialogResolver(idQueja:number){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1200px'; 
  dialogConfig.width = '800px';
  dialogConfig.data={idQueja:idQueja};
  const dialogRef= this.dialog.open(ResolverComponent, dialogConfig);
  }


}
