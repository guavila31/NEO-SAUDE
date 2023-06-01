import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDetalheReceitaComponent } from 'src/app/modals/modal-detalhe-receita/modal-detalhe-receita.component';
import { ModalPerfilComponent } from 'src/app/modals/modal-perfil/modal-perfil.component';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent implements OnInit {
  @Input() sTituloCabecalho: string;
  @Input() bExisteModal: boolean = false;

  constructor(private modalController: ModalController) {
    this.sTituloCabecalho = 'Olá, Gustavo'
  }

  ngOnInit() { }
  async abrirPerfil() {
    if (!this.bExisteModal) {
      const modal = await this.modalController.create({
        component: ModalPerfilComponent,
        cssClass: 'modal-filtro-receitas',
        componentProps: {
          'bTemCompetencia': false
        }
      });
      return await modal.present();
    }
  }
}
