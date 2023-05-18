import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheAlergiaPage } from './detalhe-alergia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheAlergiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheAlergiaPageRoutingModule {}
