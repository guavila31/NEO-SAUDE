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
    if(this.localStorageService.obterDadosAutenticacao().length){
      console.log('Esta logado!', this.localStorageService.obterDadosAutenticacao().length );
      this.navCtrl.navigateForward('/area-paciente')
    } else{
      console.log('Não esta logado!');
    }
  }

  
}
