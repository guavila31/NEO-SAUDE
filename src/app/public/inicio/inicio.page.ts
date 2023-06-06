import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { MedicoInterface } from 'src/app/interface/medico-interface';
import { PacienteInterface } from 'src/app/interface/paciente-interface';
import { UsuarioRepositorioService } from 'src/app/repository/usuario.repositorio.service';
import { ApiService } from 'src/app/services/api-service.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {

  public sTipoUsuario: 'médico' | 'paciente' = 'médico'
  public bEMedico: boolean = false
  public bELogin: boolean = true

  public sLogin: string = ''
  public sSenha: string = ''

  public sNomeCompleto: string = '';
  public sCpf: string = '';
  public sCrm: string = '';
  public sCelular: string = '';
  public sSenhaCadastro: string = '';

  public password: string = '';
  public confirmPassword: string = '';
  public passwordStrength: string = '';
  public nivelSenhaEstilo: any;
  public main: any = { "overflow": "hidden" }
  // public form: any = { "background": "#dbdbdb" }
  public form: any = { "background": "none" }

  public iDadosPaciente: PacienteInterface | undefined
  public iDadosMedico: MedicoInterface | undefined

  public bEstaValidado: boolean = false

  public estaIgual: boolean = true;

  constructor(
    private api: ApiService,
    private usuarioRepositorioService: UsuarioRepositorioService,
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertController: AlertController,
    private localStorageService: LocalStorageService,
    private formatador: FormatadorDeDadosService
  ) { }


  /**
   * @param modo "S" === "Senha" | "C"=== "Confirmar Senha" 
   */
  checkPasswordStrength(modo: string) {
    if (modo === "S") {
      if (!this.password) {
        this.passwordStrength = '';
        return;
      }
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+).+$/;
      const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.]{6,}$/;

      if (strongRegex.test(this.password)) {
        this.passwordStrength = 'Forte';
        this.nivelSenhaEstilo = { 'color': '#479833', 'border-top': '3px solid #479833', 'width': '90%', '-webkit-text-stroke-width': '0px' };
      } else if (mediumRegex.test(this.password)) {
        this.passwordStrength = 'Média';
        this.nivelSenhaEstilo = { 'color': '#cec300', 'border-top': '3px solid #cec300', 'width': '40%', '-webkit-text-stroke-width': '0.3px', '-webkit-text-stroke-color': '#a5a5a5' };
      } else {
        this.passwordStrength = 'Fraca';
        this.nivelSenhaEstilo = { 'color': '#A83B3B', 'border-top': '3px solid #A83B3B', 'width': '25%', '-webkit-text-stroke-width': '0px' };
      }
    } else {
      console.log('Passou check');
      if (this.password === this.confirmPassword) {
        console.log('Entrou check');
        this.estaIgual = true
      }
    }
  }

  validaSenhas() {
    console.log('Ativou: (EstaIgual?)', this.estaIgual);
    if (this.password === this.confirmPassword) {
      console.log('Passou if');
      this.estaIgual = true
    } else {
      console.log('Passou Else');
      this.estaIgual = false
    }
  }

  async alertPadrao(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: mensagem,
      mode: 'ios',
      buttons: ['OK']
    });
    alert.present();
  }

  validarFormulario() {
    if ((!this.bEMedico) && this.sNomeCompleto && this.sCpf && this.sCelular && this.sSenhaCadastro) {
      console.log('Validado');
      this.bEstaValidado = true
    } else if (this.bEMedico && this.sNomeCompleto && this.sCrm && this.sCelular && this.sSenhaCadastro) {
      console.log('Validado');
      this.bEstaValidado = true
    } else {
      console.log('Não Validado');
      this.bEstaValidado = false
    }
  }

  async registrar() {
    const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
    LOADING.present();
    this.validarFormulario()
    if (this.bEstaValidado) {
      if (this.bEMedico) { // Médico
        this.iDadosMedico = {
          celular: this.sCelular,
          especialidade: 'Clínico Geral',
          crm: this.sCrm,
          nome: this.sNomeCompleto,
          senha: this.sSenhaCadastro
        }
        this.usuarioRepositorioService.cadastrarMedico(this.iDadosMedico).subscribe(data => {
          console.log('Data: ', data);
          let login = this.iDadosMedico?.crm
          let senha = this.iDadosMedico?.senha

          console.log('Login M: ', login);
          console.log('Senha M: ', senha);
          this.navCtrl.navigateForward('/area-medico')
          LOADING.dismiss();
          this.localStorageService.setarIdentificadorUsuario(this.sLogin)
          this.alertaConfirmacao('Médico', { login: login, senha: senha })
          
        }, error => {
          console.log('Erro login', error);
          this.alertPadrao('Erro!', 'Houve algum erro.');
          LOADING.dismiss();
        })
      } else { // Paciente
        this.iDadosPaciente = {
          celular: this.sCelular,
          cpf: this.formatador.formatarCPF(this.sCpf),
          nome: this.sNomeCompleto,
          senha: this.sSenhaCadastro
        }
        this.usuarioRepositorioService.cadastrarPaciente(this.iDadosPaciente).subscribe(data => {
          console.log('Data: ', data);
          let login = this.iDadosPaciente?.cpf
          let senha = this.iDadosPaciente?.senha

          console.log('Login P: ', login);
          console.log('Senha P: ', senha);
          this.localStorageService.setarIdentificadorUsuario(this.sLogin)
          this.navCtrl.navigateForward('/area-paciente')
          this.alertaConfirmacao('Paciente', { login: login, senha: senha })
          LOADING.dismiss();
        }, error => {
          console.log('Erro login', error);
          this.alertPadrao('Erro', 'Houve algum erro!');
          LOADING.dismiss();
        })
      }
    } else {
      this.alertPadrao('Atenção!', 'Preencha corretamente os campos.')
      LOADING.dismiss()
    }
  }

  async alertaConfirmacao(tipoUsuario: string, dadosLogin: any) {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: tipoUsuario + ' cadastrado com sucesso!',
      mode: 'ios',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.usuarioRepositorioService.autenticar(dadosLogin);
        }
      }
      ]
    });

    await alert.present();
  }

  async entrar() {
    console.log('Login: ', this.sLogin);
    console.log('Senha: ', this.sSenha);
    const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
    LOADING.present();
    this.usuarioRepositorioService.autenticar({ "login": this.sLogin, "senha": this.sSenha }).subscribe(data => {
      console.log('data: ', data);
      // this.usuarioService.autenticar(data);
      this.usuarioService.autenticar(data);
      this.api.setarHeaders()
      if(this.sLogin.length>6){
        this.navCtrl.navigateForward('/area-paciente')
        this.localStorageService.setarIdentificadorUsuario(this.sLogin)
      } else{
        this.navCtrl.navigateForward('/area-medico')
        this.localStorageService.setarIdentificadorUsuario(this.sLogin)
      }
      LOADING.dismiss();
    }, error => {
      console.log('Erro login', error);
      this.alertPadrao('Acesso negado', 'Usuário ou senha inválido.');
      LOADING.dismiss();
    });
  }

  alterarTipoUsuario() {
    this.bEMedico = !this.bEMedico

    if (this.bEMedico)
      this.sTipoUsuario = 'paciente'
    else
      this.sTipoUsuario = 'médico'
    console.log('Usuario: ', this.bEMedico);
  }

  alterarTipoEntrada() {
    this.bELogin = !this.bELogin
    if (this.bELogin) {
      this.main = { "overflow": "hidden" }
      this.form = { "background": "none" }
      // this.form = { "background-image": "linear-gradient(to bottom, transparent 50%, #dbdbdb 50%)"}
    } else {
      this.main = { "overflow": "visible" }
      this.form = { "background": "#dbdbdb", "transition": "2.5s ease-in-out"}

    }

    console.log('login: ', this.bELogin);
  }
}
