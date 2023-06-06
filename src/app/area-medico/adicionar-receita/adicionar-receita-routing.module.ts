import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarReceitaPage } from './adicionar-receita.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarReceitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarReceitaPageRoutingModule {}
