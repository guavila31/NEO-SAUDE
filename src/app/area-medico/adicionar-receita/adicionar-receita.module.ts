import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarReceitaPageRoutingModule } from './adicionar-receita-routing.module';

import { AdicionarReceitaPage } from './adicionar-receita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarReceitaPageRoutingModule
  ],
  declarations: [AdicionarReceitaPage]
})
export class AdicionarReceitaPageModule {}
