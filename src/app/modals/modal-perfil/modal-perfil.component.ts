import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, NavParams } from '@ionic/angular';
import { MedicoInterface } from 'src/app/interface/medico-interface';
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

  private sIdUsuario: string | null = ''
  public iDadosPaciente: PacienteInterface
  public iDadosMedico: MedicoInterface

  public sNome: string | undefined
  public sCpf: string | undefined
  public sCrm: string | undefined
  public sDataNasc: any
  public sCelular: any
  public sEmail: string | undefined
  
  public sClinica: any
  public sEspecialidade: any 

  public sIniciaisNome: string = ''

  public sTipoUsuario: string = ''

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
    this.iDadosMedico = this.navParams.get('iDadosMedico');
    if (this.iDadosPaciente) {
      this.sTipoUsuario = 'P'
      this.sNome = this.iDadosPaciente.nome
      this.sCpf = this.iDadosPaciente.cpf
      this.sIdUsuario = this.localStorageService.obteIdUsuario()
      this.sDataNasc = this.iDadosPaciente.dataNascimento ? formatador.formatarDataDDMMAAAA(this.iDadosPaciente.dataNascimento) : ''
      this.sCelular = this.iDadosPaciente.celular
      this.sEmail = this.iDadosPaciente.email ? this.iDadosPaciente.email : ''
      this.sIniciaisNome = formatador.obterIniciais(this.sNome)
      console.log('Paciente: ', this.iDadosPaciente)
    } else {
      this.sTipoUsuario = 'M'
      this.sNome = this.iDadosMedico.nome
      this.sCrm = this.iDadosMedico.crm
      this.sIdUsuario = this.localStorageService.obteIdUsuario()
      this.sDataNasc = this.iDadosMedico.dataNascimento ? formatador.formatarDataDDMMAAAA(this.iDadosMedico.dataNascimento) : ''
      this.sCelular = this.iDadosMedico.celular
      this.sEmail = this.iDadosMedico.email ? this.iDadosMedico.email : ''
      this.sIniciaisNome = formatador.obterIniciais(this.sNome)
      console.log('Médico', this.iDadosMedico);
    }
  }

  ngOnInit() {
  }

  construirBody(sTipoUsuario: string) {
    if (sTipoUsuario === "P") {
      this.iDadosPaciente = {
        id: this.sIdUsuario,
        celular: this.sCelular,
        cpf: this.sCpf,
        dataNascimento: this.formatador.formatarDataAAAAMMDD(this.sDataNasc),
        nome: this.sNome,
        email: this.sEmail
      }
    } else {
      this.iDadosMedico = {
        celular: this.sCelular,
        crm: this.sCrm,
        clinica: this.sClinica,
        especialidade: this.sCrm,
        dataNascimento: this.formatador.formatarDataAAAAMMDD(this.sDataNasc),
        nome: this.sNome,
        email: this.sEmail
      }
    }
  }

  async salvarPerfil(sTipoUsuario: string) {
    const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
    LOADING.present();
    if(sTipoUsuario === 'P'){
      this.construirBody('P')
      try {
        console.log('*******: ', this.iDadosPaciente);
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
    }else{
      this.construirBody('M')
      try {
        console.log('*******: ', this.iDadosPaciente);
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
          { text: 'Ok', handler: () => { this.sairDoApp() } },
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
        { text: 'Ok', handler: () => { this.deleteConta(this.sTipoUsuario) } },
        { text: 'Cancelar', role: 'cancel' },
      ]
    });
    alert.present();
  }

  async deleteConta(sTipoUsuario: string) {
    const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
    LOADING.present();
    try {
      if (sTipoUsuario === "P") {
        await this.api.req('paciente/' + this.sIdUsuario, [], 'delete', {}, false, false, false)
          .then(data => {
            console.log('>>>>>>>: ', data)
            this.alertPadrao('Sucesso', 'Sua conta foi deletada com sucesso')
            this.sairDoApp()
            LOADING.dismiss()
          });
      } else {
        await this.api.req('medico/' + this.sIdUsuario, [], 'delete', {}, false, false, false)
          .then(data => {
            console.log('>>>>>>>: ', data)
            this.alertPadrao('Sucesso', 'Sua conta foi deletada com sucesso')
            this.sairDoApp()
            LOADING.dismiss()
          });
      }
    } catch (err) {
      LOADING.dismiss()
      console.log(err)
      throw err;
    }
  }

  /**
   * @param modal recebe modal para realizar o seu fechamento 
   */
  sairDoApp() {
    this.navCtrl.navigateRoot('/')
    this.localStorageService.logout()
    this.modalController.dismiss()
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
