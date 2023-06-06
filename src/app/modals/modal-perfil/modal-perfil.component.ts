import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { PacienteInterface } from 'src/app/interface/paciente-interface';
import { ApiService } from 'src/app/services/api-service.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss'],
})
export class ModalPerfilComponent implements OnInit {

  private sIdPaciente: string = '1'
  public iDadosPaciente: PacienteInterface

  public sNome: string | undefined
  public sCpf: string | undefined
  public sDataNasc: string | undefined
  public sCelular: string | undefined
  public sEmail: string | undefined

  public iDadosPacienteAtualizar: PacienteInterface = {}
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public formatador: FormatadorDeDadosService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private localStorageService: LocalStorageService
  ) {
    this.iDadosPaciente = this.navParams.get('iDadosPaciente');
    this.sNome = this.iDadosPaciente.nome
    this.sCpf = this.iDadosPaciente.cpf
    this.sDataNasc = this.iDadosPaciente.dataNascimento
    this.sCelular = this.iDadosPaciente.celular
    this.sEmail = this.iDadosPaciente.email
    console.log('Paciente: ', this.iDadosPaciente)
  }

  ngOnInit() {
  }

  formatarData(event: any) {
    const valor = event.target.value.toString();
    let dataFormatada = '';
    if (valor.length === 2) {
      dataFormatada = valor + '/';
      this.sDataNasc = dataFormatada;
    } else if (valor.length === 5) {
      dataFormatada = valor.slice(0, 3) + '' + valor.slice(3) + '/';
      this.sDataNasc = dataFormatada;
    } else if (valor.length > 5) {
      dataFormatada = valor.slice(0, 10);
      this.sDataNasc = dataFormatada;
    }
    console.log('Data: ', this.sDataNasc)
  }

  construirBody() {
    this.iDadosPaciente = {
      celular: this.sCelular,
      cpf: this.sCpf,
      dataNascimento: this.sDataNasc,
      nome: this.sNome
    }
  }

  async salvarPerfil() {
    this.construirBody()
    const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
    LOADING.present();
    try {
      await this.api.req('paciente', [], 'put', this.iDadosPaciente, true, false, false)
        .then(data => {
          console.log('Data: ', data)
          this.alertPadrao('Sucesso!', 'Dados atualizados com sucesso.')
          LOADING.dismiss()
        });
    } catch (err) {
      await this.alertPadrao('Erro!', 'Ocorreu algum erro, tente novamente.')
      LOADING.dismiss()
      console.log(err)
      throw err;
    }
  }

  /**
   * @param sModo 'F' só fecha | 'A' abre um alert pra confirmacao
   */
  async desconectar(sModo: string) {
    if (sModo === 'F') {
      this.modalController.dismiss()
    } else {
      const alert = await this.alertController.create({
        header: 'Atenção',
        subHeader: 'Deseja realmente sair?',
        mode: 'ios',
        buttons: [
          { text: 'Ok', handler: () => { this.navCtrl.navigateRoot('/'), this.modalController.dismiss(), this.localStorageService.logout() } },
          { text: 'Cancelar', role: 'cancel' },
        ]
      });
      alert.present();
    }
  }

  async excluirConta() {
    const alert = await this.alertController.create({
      header: 'Atenção!',
      subHeader: 'Deseja realmente excluir sua conta permanentemente?',
      mode: 'ios',
      buttons: [
        { text: 'Ok', handler: () => { this.navCtrl.navigateRoot('/'), this.modalController.dismiss() } },
        { text: 'Cancelar', role: 'cancel' },
      ]
    });
    alert.present();
  }

  async alertPadrao(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: mensagem,
      mode: 'ios',
      buttons: [{ text: 'Ok', handler: () => { this.desconectar('F'); } }]
    });
    alert.present();
  }
}
