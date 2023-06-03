import { Component, OnInit } from '@angular/core';
import { Venta, ventas } from '../Ventas';
import { ActivatedRoute, Router } from '@angular/router';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  isSideNavCollapsed=false;
  screenWidth: number = 0;
  productos= ventas;
  venta?: Venta;
   idQueja: string ="";
  constructor( private route: ActivatedRoute,
    private router: Router) { 
  
    console.log()
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
     this.idQueja = params['idQueja'];
     console.log(this.idQueja)
     this.verDetalle(parseInt(this.idQueja, 10));
    });
    // Llamar a la función verDetalle con el ID de la venta deseada
    
  }

  verDetalle(id: number): void {
    // Buscar la venta por ID
    this.venta = ventas.find(v => v.id_venta === id);
    console.log(this.venta)
  }

  regresar() {
    this.router.navigate(['dashboard/pantalla-beta-ventas']);
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
}
