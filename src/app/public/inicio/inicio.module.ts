
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
