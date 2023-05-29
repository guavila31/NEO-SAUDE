import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-detalhe-receita',
  templateUrl: './modal-detalhe-receita.component.html',
  styleUrls: ['./modal-detalhe-receita.component.scss'],
})
export class ModalDetalheReceitaComponent implements OnInit {
  @Input() bTemCompetencia: boolean;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams) {
    this.bTemCompetencia = this.navParams.get('bTemCompetencia');
    console.log('bTemCompetencia: ', this.bTemCompetencia)
   }

  ngOnInit() { }

  voltar() {
    this.modalCtrl.dismiss()
  }
}


