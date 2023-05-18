import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaPacientePage } from './area-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: AreaPacientePage
  },
  {
    path: 'alergia',
    loadChildren: () => import('./alergia/alergia.module').then( m => m.AlergiaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaPacientePageRoutingModule {}
