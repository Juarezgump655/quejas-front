import { BodyComponent } from './componentes/dashboard/body/body.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MiPrestamitoRegistrarseComponent } from './componentes/Usuario-Externo/Mi-prestamito-registrarse/Mi-prestamito-registrarse.component';
import { AuthGuardGuard } from './componentes/helpers/auth-guard.guard';
import { AutoConsultaComponent } from './componentes/auto-consulta/auto-consulta.component';

const routes: Routes = [
  {path : 'menu-principal', component:HomeComponent},
  {path:'',redirectTo:'menu-principal',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'registrarse-usuario',component:MiPrestamitoRegistrarseComponent},
  {path:'auto-consulta-usuario',component:AutoConsultaComponent},

  //ruta en modo perezoso, para rutas hijas
  {path:'dashboard',
  canActivate: [AuthGuardGuard],
  children:[
    {
      path:'',
      loadChildren: () => import('./componentes/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
  ]
}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
