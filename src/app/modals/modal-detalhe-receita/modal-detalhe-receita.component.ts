import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { DadosMedicamentoInterface, DetalheMedicoInterface, DetalhePrescricaoInterface, DetalheReceitaInterface } from 'src/app/interface/receita-interface';
import { ApiService } from 'src/app/services/api-service.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';
import { IdentificadorGeneroServiceService } from 'src/app/services/identificador-genero.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-modal-detalhe-receita',
  templateUrl: './modal-detalhe-receita.component.html',
  styleUrls: ['./modal-detalhe-receita.component.scss'],
})
export class ModalDetalheReceitaComponent implements OnInit {
  @Input() bTemCompetencia: boolean;

  private nIdReceita: number
  private sNomeMedico: string = ''

  public bGenero: boolean = false  // false = masculino | true = feminnino
  public bFoiCarregado: boolean = false

  public aDetalhePrescricao: DetalhePrescricaoInterface[] = []
  public aDetalheMedicamento: DadosMedicamentoInterface[] = []
  public aDetalheReceita: DetalheReceitaInterface | undefined
  public aDadosMedico: DetalheMedicoInterface | undefined

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private api: ApiService,
    private identGenero: IdentificadorGeneroServiceService,
    private localStorageService: LocalStorageService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public formatadorDeData: FormatadorDeDadosService) {
    this.bTemCompetencia = this.navParams.get('bTemCompetencia');
    this.nIdReceita = this.navParams.get('nIdReceita');
    console.log('bTemCompetencia: ', this.bTemCompetencia)
    console.log('nIdReceita: ', this.nIdReceita)
  }

  ngOnInit() {
    this.getDetalheReceita()
  }

  voltar() {
    this.modalCtrl.dismiss()
  }

  async getDetalheReceita() {
    try {
      await this.api.req('receita/' + this.nIdReceita, [], 'get', {}, false, false, false)
        .then(data => {
          this.aDetalheReceita = data
          this.aDetalhePrescricao = data.listaPrescricoes
          this.aDadosMedico = data.dadosMedico
          this.sNomeMedico = this.aDadosMedico?.nome ? this.aDadosMedico.nome.split(' ')[0] : ''
          this.checarGenero()
          this.bFoiCarregado = true
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

  async alertFinalizar() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      subHeader: 'Deseja realmente finalizar essa receita?',
      message: '(Ao finalizar a receita ela entrará no histórico)',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: () => {
            this.finalizarReceita()
          }
        }
      ]
    });

    await alert.present();
  }

  async finalizarReceita() {
    const loading = await this.loadingController.create({
      message: 'Aguarde',
      spinner: 'bubbles'
    });
    await loading.present();
    try {
      await this.api.req('receita/alterarStatus/' + this.localStorageService.obteIdUsuario(), [], 'put', {id:this.nIdReceita, ativo:false}, false, false, false)
        .then(data => {
          console.log('Status Receita: ', data)
          this.alertPadrao('Sucesso!', 'Receita finalizada com sucesso!')
          loading.dismiss()
        });
    } catch (err) {
      console.log(err)
      this.alertPadrao('Ops!', 'Algo deu errado, tente novamente!')
      loading.dismiss()
      throw err;
    }
  }

  async alertPadrao(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      mode: 'ios',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.voltar()
        }
      }]
    });

    await alert.present();
  }
}


