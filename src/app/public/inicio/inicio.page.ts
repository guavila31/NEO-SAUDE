import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UsuarioRepositorioService } from 'src/app/repository/usuario.repositorio.service';
import { ApiService } from 'src/app/services/api-service.service';
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

  public sLogin: string = 'luis.barros@neosaude.com.br'
  public sSenha: string = ''

  public password: string = '';
  public confirmPassword: string = '';
  public passwordStrength: string = '';
  public nivelSenhaEstilo: any;

  public estaIgual: boolean = true;

  constructor(
    private api: ApiService,
    private usuarioRepositorioService: UsuarioRepositorioService,
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
  ) { }

  
  /**
   * @param modo "S" === "Senha" | "C"=== "Confirmar Senha" 
   */ 
  checkPasswordStrength(modo: string) {
    if(modo === "S"){
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
    }else{
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

  registrar() { }

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
      this.navCtrl.navigateForward('/area-paciente')
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
    console.log('login: ', this.bELogin);
  }
}
