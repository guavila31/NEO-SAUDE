import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { MedicoInterface } from '../interface/medico-interface';
import { FormatadorDeDadosService } from '../services/formatador-de-dados.service';
import { IdentificadorGeneroServiceService } from '../services/identificador-genero.service';
import { ModalController } from '@ionic/angular';
import { ModalPerfilComponent } from '../modals/modal-perfil/modal-perfil.component';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-area-medico',
  templateUrl: './area-medico.page.html',
  styleUrls: ['./area-medico.page.scss'],
})
export class AreaMedicoPage implements OnInit {

  public iDadosMedico: MedicoInterface | undefined
  public sCrmMedico: any = this.localStorageService.obterCpfCrmUsuario()
  public sTituloCabecalho: string = ''

  public sNomeMedico: string = ''
  public bGenero: boolean = false  // false = masculino | true = feminnino
  
  public bMenuPrincipal: boolean = true
  public bExisteModal: boolean = false

  constructor(
    private api: ApiService,
    private formatador: FormatadorDeDadosService,
    private identGenero: IdentificadorGeneroServiceService,
    private modalController: ModalController,
    private localStorageService: LocalStorageService
  ) {
    this.getDadosMedico()
   }

  ngOnInit() {
  }

  async getDadosMedico(event?: any) {
    if (event)
      event.target?.complete();
    try {
      await this.api.req('medico/crm/' + this.sCrmMedico, [], 'get', {}, false, false, false)
        .then(data => {

          this.iDadosMedico = data
          this.sNomeMedico = this.formatador.formatarPrimeiroNome(data.nome)

          console.log('Médico: ', this.iDadosMedico);
          console.log('Nome Médico: ', this.sNomeMedico);

          this.checarGenero()
          this.sTituloCabecalho = 'Olá ' + (!this.bGenero ? 'Dr. ' : 'Dra. ') + this.sNomeMedico

          console.log(this.sTituloCabecalho);

        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  checarGenero() {
    if (this.sNomeMedico !== '') {
      this.identGenero.getGender(this.sNomeMedico)
        .then(gender => {
          console.log('Genero: ', gender)
          this.bGenero = (gender === 'female' ? true : false);
        });
    }
  }

  trocarTela(){
    this.bMenuPrincipal = !this.bMenuPrincipal
  }

  async abrirPerfil() {
    console.log('Dados:::', this.iDadosMedico);
    if (!this.bExisteModal) {
      const modal = await this.modalController.create({
        component: ModalPerfilComponent,
        cssClass: 'modal-filtro-receitas',
        componentProps: {
          'iDadosMedico': this.iDadosMedico
        }
      });
      return await modal.present();
    }
    this.bExisteModal = true
    this.modalController.dismiss()
  }
}
