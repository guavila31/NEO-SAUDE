import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SairGuard } from './guard/sair-guard.guard';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./public/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [SairGuard]
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
    canActivate: [SairGuard]
  },
  {
    path: 'area-paciente',
    loadChildren: () => import('./area-paciente/area-paciente.module').then( m => m.AreaPacientePageModule)
  },
  {
    path: 'area-medico',
    loadChildren: () => import('./area-medico/area-medico.module').then( m => m.AreaMedicoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private alertController: AlertController) { }
 }
