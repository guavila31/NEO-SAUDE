import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDetalheReceitaComponent } from 'src/app/modals/modal-detalhe-receita/modal-detalhe-receita.component';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss'],
})
export class ReceitaComponent  implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}
  async abrirDetalhes(){
    const modal = await this.modalController.create({
      component: ModalDetalheReceitaComponent,
      cssClass: 'modal-filtro-receitas',
      componentProps: {
        'bTemCompetencia': false
      }
    });
    return await modal.present();
  }
}
