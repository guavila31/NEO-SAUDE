import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaMedicoPage } from './area-medico.page';

const routes: Routes = [
  {
    path: '',
    component: AreaMedicoPage
  },
  {
    path: 'adicionar-receita',
    loadChildren: () => import('./adicionar-receita/adicionar-receita.module').then( m => m.AdicionarReceitaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaMedicoPageRoutingModule {}
