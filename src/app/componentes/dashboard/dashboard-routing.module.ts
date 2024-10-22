import { AsignacionQuejaComponent } from './asignacion-queja/asignacion-queja.component';
import { BodyComponent } from './body/body.component';
import { UsuariosPaComponent } from './usuarios-pa/usuarios-pa.component';
import { ReporteAdministrativoComponent } from './reporte-administrativo/reporte-administrativo.component';
import { SeguimientoCentralizadorComponent } from './seguimiento-centralizador/seguimiento-centralizador.component';
import { ResolucionQuejaComponent } from './resolucion-queja/resolucion-queja.component';
import { IngresoQuejaComponent } from './ingreso-queja/ingreso-queja.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PuntosAtencionComponent } from './puntos-atencion/puntos-atencion.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TipoQuejasComponent } from './tipo-quejas/tipo-quejas.component';
import { FichaComponent } from './asignacion-queja/ficha/ficha.component';
import { FichaQuejaPaComponent } from './resolucion-queja/ficha-queja-pa/ficha-queja-pa.component';
import { FichaSeguimientoComponent } from './seguimiento-centralizador/ficha-seguimiento/ficha-seguimiento.component';
import { BetaInventarioComponent } from './beta-inventario/beta-inventario.component';
import { VentasInvetarioComponent } from './ventas-invetario/ventas-invetario.component';
import { DetalleVentaComponent } from './ventas-invetario/detalle-venta/detalle-venta.component';


const routes: Routes = [
  {
    path:'',
  
  children:[
   {path:'puntos-atencion',component:PuntosAtencionComponent},
   {path:'usuarios-pa',component:UsuariosPaComponent},
   {path:'ingreso-queja',component:IngresoQuejaComponent},
   {path:'asignacion-queja',component:AsignacionQuejaComponent},
   {path:'resolucion-queja',component:ResolucionQuejaComponent},
   {path:'seguimiento-centralizador',component:SeguimientoCentralizadorComponent},
   {path:'reporte-administrativo',component:ReporteAdministrativoComponent},
   {path:'sidebar',component:SidebarComponent},
    {path:'body',component:BodyComponent},
    {path:'tipo-queja',component:TipoQuejasComponent},
   {path:'principal',component:DashboardComponent},
    {path:'',redirectTo:'dashboard/principal'},
    {path:'ficha',component:FichaComponent},
    {path:'ficha-seguimiento',component:FichaSeguimientoComponent},
    {path:'ficha-pa',component: FichaQuejaPaComponent},
    {path:'patalla-beta', component:BetaInventarioComponent},
    {path:'pantalla-beta-ventas', component:VentasInvetarioComponent},
    {path:'detalle-Venta', component:DetalleVentaComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
