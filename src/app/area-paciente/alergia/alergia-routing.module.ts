import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlergiaPage } from './alergia.page';
import { DetalheAlergiaPage } from './detalhe-alergia/detalhe-alergia.page';

const routes: Routes = [
  {
    path: '',
    component: AlergiaPage
  },
  {
    path: 'detalhe-alergia',
    loadChildren: () => import('./detalhe-alergia/detalhe-alergia.module').then( m => m.DetalheAlergiaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlergiaPageRoutingModule {}
