import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { tablaSeguimientoDetalle } from 'src/app/componentes/Models/Queja';
import { QuejaService } from 'src/app/service/Queja.service';
import { RechazarCentralizadorComponent } from '../rechazar-centralizador/rechazar-centralizador.component';
import { ResolverComponent } from '../resolver/resolver.component';
import { FileServiceService } from 'src/app/service/FileService.service';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-ficha-seguimiento',
  templateUrl: './ficha-seguimiento.component.html',
  styleUrls: ['./ficha-seguimiento.component.css']
})
export class FichaSeguimientoComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  idQueja:number=0;
  fichaQueja?: tablaSeguimientoDetalle;
  progressInfos: { value: number, fileName: string }[] = [];
  filename = '';
  selectedFiles?: FileList;

  constructor(
    private route: ActivatedRoute,
    private service: QuejaService,
    public dialog: MatDialog,
    private FileService: FileServiceService
  ) { 

    this.route.queryParams.subscribe(params => {
      this.idQueja = params['idQueja']
    });

    
  }

  ngOnInit() {
    this.traerFicha();
    
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

  traerFicha(){
    this.service.tablaSeguimientoQuejaDetalle(this.idQueja).subscribe(ficha=>{
      this.fichaQueja= ficha;
      console.log(this.fichaQueja)
    })
  }


  descargarArchivo() {
    this.FileService.descargarArchivo(this.fichaQueja?.correlativo+".pdf").subscribe(
      (blob) => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = this.idQueja+".pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error) => console.log(error)
    );
  }


  openDialogRechazar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '800px'; 
  dialogConfig.width = '600px';
  dialogConfig.data={idQueja:this.idQueja}
  const dialogRef= this.dialog.open(RechazarCentralizadorComponent, dialogConfig);
  }
  
  openDialogResolver(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '1200px'; 
  dialogConfig.width = '800px';
  dialogConfig.data={idQueja:this.idQueja}
  const dialogRef= this.dialog.open(ResolverComponent, dialogConfig);
  
  
  }


}
