import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgregarPuntoComponent } from './puntos-atencion/agregar-punto/agregar-punto.component';
import { ReporteAdministrativoComponent } from './reporte-administrativo/reporte-administrativo.component';
import { SeguimientoCentralizadorComponent } from './seguimiento-centralizador/seguimiento-centralizador.component';
import { ResolucionQuejaComponent } from './resolucion-queja/resolucion-queja.component';
import { AsignacionQuejaComponent } from './asignacion-queja/asignacion-queja.component';
import { IngresoQuejaComponent } from './ingreso-queja/ingreso-queja.component';
import { UsuariosPaComponent } from './usuarios-pa/usuarios-pa.component';
import { BodyComponent } from './body/body.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { PuntosAtencionComponent } from './puntos-atencion/puntos-atencion.component';
import { DashboardComponent } from './dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ModificarPuntoComponent } from './puntos-atencion/modificar-punto/modificar-punto.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TipoQuejasComponent } from './tipo-quejas/tipo-quejas.component';
import { AgregarTipoComponent } from './tipo-quejas/agregar-tipo/agregar-tipo.component';
import { modificarPunto } from '../Models/PuntosAtencion';
import { ModificarTipoComponent } from './tipo-quejas/modificar-tipo/modificar-tipo.component';
import { AgregarUsuarioComponent } from './usuarios-pa/agregar-usuario/agregar-usuario.component';
import { ModificarUsuarioComponent } from './usuarios-pa/modificar-usuario/modificar-usuario.component';
import { FichaComponent } from './asignacion-queja/ficha/ficha.component';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { AsignarQuejaComponent } from './asignacion-queja/asignar-queja/asignar-queja.component';
import { RechazarQuejaComponent } from './asignacion-queja/rechazar-queja/rechazar-queja.component';
import { FichaQuejaPaComponent } from './resolucion-queja/ficha-queja-pa/ficha-queja-pa.component';
import {MatIconModule} from '@angular/material/icon';
import { FichaSeguimientoComponent } from './seguimiento-centralizador/ficha-seguimiento/ficha-seguimiento.component';
import { ResolverComponent } from './seguimiento-centralizador/resolver/resolver.component';
import { RechazarCentralizadorComponent } from './seguimiento-centralizador/rechazar-centralizador/rechazar-centralizador.component';
import { BetaInventarioComponent } from './beta-inventario/beta-inventario.component';
import { AgregarProductoComponent } from './beta-inventario/agregar-producto/agregar-producto.component';
import { ModificarProductoComponent } from './beta-inventario/modificar-producto/modificar-producto.component';
import { VentasInvetarioComponent } from './ventas-invetario/ventas-invetario.component';
import { DetalleVentaComponent } from './ventas-invetario/detalle-venta/detalle-venta.component';
@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    PuntosAtencionComponent,
    BodyComponent,
    UsuariosPaComponent,
    IngresoQuejaComponent,
    AsignacionQuejaComponent,
    ResolucionQuejaComponent,
    SeguimientoCentralizadorComponent,
    ReporteAdministrativoComponent,
    AgregarPuntoComponent,
    ModificarPuntoComponent,
    TipoQuejasComponent,
    AgregarTipoComponent,
   ModificarTipoComponent,
   AgregarUsuarioComponent,
   ModificarUsuarioComponent,
   FichaComponent,
   AsignarQuejaComponent,
   RechazarQuejaComponent,
   FichaSeguimientoComponent,
   ResolverComponent,
   RechazarCentralizadorComponent,
   FichaQuejaPaComponent,
   BetaInventarioComponent,
   AgregarProductoComponent,
   ModificarProductoComponent,
   VentasInvetarioComponent,
   DetalleVentaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule
    
    
   
  ]
})
export class DashboardModule { }
