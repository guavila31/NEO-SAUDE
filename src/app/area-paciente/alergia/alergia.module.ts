import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlergiaPageRoutingModule } from './alergia-routing.module';

import { AlergiaPage } from './alergia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlergiaPageRoutingModule
  ],
  declarations: [AlergiaPage]
})
export class AlergiaPageModule {}
