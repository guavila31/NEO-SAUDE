import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaMedicoPageRoutingModule } from './area-medico-routing.module';

import { AreaMedicoPage } from './area-medico.page';
import { CabecalhoComponent } from '../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../components/rodape/rodape.component';
import { ModalPerfilComponent } from '../modals/modal-perfil/modal-perfil.component';
import { HistoricoComponent } from '../area-paciente/historico/historico.component';
import { HomeComponent } from '../area-paciente/home/home.component';
import { ReceitaComponent } from '../area-paciente/receita/receita.component';
import { ModalDetalheReceitaComponent } from '../modals/modal-detalhe-receita/modal-detalhe-receita.component';
import { ModalFiltroReceitasComponent } from '../modals/modal-filtro-receitas/modal-filtro-receitas.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaMedicoPageRoutingModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AreaMedicoPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AreaMedicoPageModule {}
