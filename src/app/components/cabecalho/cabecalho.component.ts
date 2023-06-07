import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PacienteInterface } from 'src/app/interface/paciente-interface';
import { ModalPerfilComponent } from 'src/app/modals/modal-perfil/modal-perfil.component';
import { ApiService } from 'src/app/services/api-service.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent implements OnInit {
  @Input() sTituloCabecalho: string = '';
  @Input() bExisteModal: boolean = false;

  private sIdPaciente: string = ''

  public iDadosPaciente: PacienteInterface[]=[]

  public sIniciaisNome: string = ''

  constructor(
    private modalController: ModalController,
    private api: ApiService,
    private formatador: FormatadorDeDadosService,
    private localStorageService: LocalStorageService,
    ) {
    this.getDadosPaciente()
  }

  ngOnInit() { }

  async abrirPerfil() {
    if (!this.bExisteModal) {
      const modal = await this.modalController.create({
        component: ModalPerfilComponent,
        cssClass: 'modal-filtro-receitas',
        componentProps: {
          'iDadosPaciente': this.iDadosPaciente
        }
      });
      return await modal.present();
    }
  }

  async getDadosPaciente(event?: any) {
    if (event)
      event.target?.complete();
    try {
      // await this.api.req('paciente/' + this.sIdPaciente, [], 'get', {}, false, false, false)
      //   .then(data => {
      //     this.iDadosPaciente = data
      //     this.sTituloCabecalho = 'Olá ' + this.formatador.formatarPrimeiroNome(data.nome)
      //   });
      await this.api.req('paciente/cpf/' + this.formatador.formatarCPF(this.localStorageService.obterCpfCrmUsuario()), [], 'get', {}, false, false, false)
      .then(data => {
        console.log('Retorno: ', data);
        this.sIniciaisNome = this.formatador.obterIniciais(data.nome)
        this.sIdPaciente = data.id
        this.iDadosPaciente = data
        this.sTituloCabecalho = 'Olá ' + this.formatador.formatarPrimeiroNome(data.nome)
      });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}
