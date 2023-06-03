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

  constructor(
    private api: ApiService,
    private usuarioRepositorioService: UsuarioRepositorioService,
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
  ) { }

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
    this.usuarioRepositorioService.autenticar({"login": this.sLogin, "senha": this.sSenha}).subscribe(data => {
      console.log('data: ', data);
      // this.usuarioService.autenticar(data);
      this.usuarioService.autenticar(data);
      this.api.setarHeaders()
      this.navCtrl.navigateForward('/area-paciente')
      LOADING.dismiss();
    }, error => {
      console.log('Erro login',error);
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
