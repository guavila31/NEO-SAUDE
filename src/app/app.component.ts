import { Component } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private localStorageService: LocalStorageService, private navCtrl: NavController) {

    console.log('CRM ou CPF : ', this.localStorageService.obteIdUsuario());
    if (this.localStorageService.obterCpfCrmUsuario() && this.localStorageService.obterCpfCrmUsuario().length) {
      if (this.localStorageService.obterCpfCrmUsuario().length > 6)
        this.navCtrl.navigateForward('/area-paciente')
      else
        this.navCtrl.navigateForward('/area-medico')

      console.log('Esta logado! : ', this.localStorageService.obterCpfCrmUsuario().length);
      console.log('CRM ou CPF : ', this.localStorageService.obteIdUsuario());
    } else {
      console.log('Não esta logado!');
    }
  }


}
