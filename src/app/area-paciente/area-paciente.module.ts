import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaPacientePageRoutingModule } from './area-paciente-routing.module';

import { AreaPacientePage } from './area-paciente.page';
import { CabecalhoComponent } from '../components/cabecalho/cabecalho.component';
import { RodapeComponent } from '../components/rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { ReceitaComponent } from './receita/receita.component';
import { HistoricoComponent } from './historico/historico.component';
import { ModalFiltroReceitasComponent } from '../modals/modal-filtro-receitas/modal-filtro-receitas.component';
import { ModalDetalheReceitaComponent } from '../modals/modal-detalhe-receita/modal-detalhe-receita.component';
import { ModalPerfilComponent } from '../modals/modal-perfil/modal-perfil.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaPacientePageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AreaPacientePage,
    CabecalhoComponent,
    RodapeComponent,
    HomeComponent,
    ReceitaComponent,
    HistoricoComponent,
    ModalFiltroReceitasComponent,
    ModalDetalheReceitaComponent,
    ModalPerfilComponent,
  ]
})
export class AreaPacientePageModule {}
