import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFiltroReceitasComponent } from 'src/app/modals/modal-filtro-receitas/modal-filtro-receitas.component';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  async filtrar() {
    const modal = await this.modalController.create({
      component: ModalFiltroReceitasComponent,
      cssClass: 'modal-filtro-receitas',
    });
    return await modal.present();
  }
}
