import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheAlergiaPageRoutingModule } from './detalhe-alergia-routing.module';

import { DetalheAlergiaPage } from './detalhe-alergia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheAlergiaPageRoutingModule
  ],
  declarations: [DetalheAlergiaPage]
})
export class DetalheAlergiaPageModule {}
