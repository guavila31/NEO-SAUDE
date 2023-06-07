import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalDetalheReceitaComponent } from 'src/app/modals/modal-detalhe-receita/modal-detalhe-receita.component';
import { ModalFiltroReceitasComponent } from 'src/app/modals/modal-filtro-receitas/modal-filtro-receitas.component';
import { ApiService } from 'src/app/services/api-service.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent implements OnInit {

  public sIdPaciente: string | null
  public aListaHistorico: any[] = []
  constructor(
    public modalController: ModalController,
    private api: ApiService,
    public formatadorDeData: FormatadorDeDadosService,
    private localStorageService: LocalStorageService) {
    this.sIdPaciente = this.localStorageService.obteIdUsuario()
    this.getListaHistorico()
  }

  ngOnInit() { }

  async recarregar(event: any) {
    setTimeout(() => {
      try {
        this.getListaHistorico(event)
      } catch (error) {
        console.log('Erro: ', error)
      }
    }, 1000);
  }

  async filtrar() {
    const modal = await this.modalController.create({
      component: ModalFiltroReceitasComponent,
      cssClass: 'modal-filtro-receitas',
    });
    return await modal.present();
  }

  async abrirDetalhes(idReceita: number) {
    const modal = await this.modalController.create({
      component: ModalDetalheReceitaComponent,
      cssClass: 'modal-filtro-receitas',
      componentProps: {
        'bTemCompetencia': true,
        'nIdReceita': idReceita
      }
    });
    return await modal.present();
  }

  async getListaHistorico(event?: any) {
    if (event)
      event.target?.complete();
    try {
      await this.api.req('receita/inativas/' + this.sIdPaciente, [], 'get', {}, false, false, false)
        .then(data => {
          this.aListaHistorico = data
          console.log('Historico: ', this.aListaHistorico)
        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}
