import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDetalheReceitaComponent } from 'src/app/modals/modal-detalhe-receita/modal-detalhe-receita.component';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss'],
})
export class ReceitaComponent  implements OnInit {

  public sIdPaciente: string = '1'
  public aListaReceita: any[]=[]
  constructor(
    private modalController: ModalController,
    private api: ApiService
  ) {
    this.getListaReceitas()
  }

  async recarregar(event: any) {
    setTimeout(() => {
      try {
        this.getListaReceitas(event)
      } catch (error) {
        console.log('Erro: ', error)
      }
    }, 1000);
  }

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

  async getListaReceitas(event?: any) {
    if (event)
      event.target?.complete();
    try {
      await this.api.req('receita/ativas/' + this.sIdPaciente, [], 'get', {}, false, false, false)
        .then(data => {
          this.aListaReceita = data
          console.log('Receitas: ', this.aListaReceita)
        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}
