import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SairGuard implements CanActivate {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private storage: LocalStorageService,
    private loadingController: LoadingController,
    private modalController: ModalController) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    if (this.storage.obteIdUsuario() !== null) {
      console.log('Entrou: ', this.storage.obteIdUsuario());

      const alert = await this.alertController.create({
        header: 'Atenção!',
        message: 'Deseja realmente sair do aplicativo?',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: async () => {
              console.log('Rota Atual: ', this.storage.obteRota());
              this.router.navigateByUrl(this.storage.obteRota());
            }
          },
          {
            text: 'Confirmar',
            handler: async () => {
              const loading = await this.loadingController.create({
                message: 'Saindo...',
                duration: 1000,
                spinner: 'bubbles'
              });
              await loading.present();
              this.modalController.dismiss();
              this.storage.logout()
              return true;
            }
          }
        ]
      });

      await alert.present();

      await alert.onDidDismiss();
    }
  }
}