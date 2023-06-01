import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-alergia',
  templateUrl: './alergia.page.html',
  styleUrls: ['./alergia.page.scss'],
})
export class AlergiaPage implements OnInit {

  public aDadosAlergia: any[] = []
  constructor(
    private api: ApiService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // this.getListaAlergia()
  }

  ionViewDidEnter() {
    this.getListaAlergia()
    console.log('aqui')
  }

  ionViewCanEnter() {
    this.getListaAlergia()
    console.log('aqui')
  }

  ionViewWillEnter() {
    this.getListaAlergia()
    console.log('aqui')
  }

  formatarData(data: any): string | null {
    // const dateObj = new Date(data);
    // let novaData = this.datePipe.transform(dateObj, 'dd/MM/yyyy');
    const partes = data.split('-');
    const ANO = partes[0];
    const MES = partes[1];
    const DIA = partes[2];
    const dataFormatada = `${DIA}/${MES}/${ANO}`;
    return dataFormatada;
  }

  async getListaAlergia() {
    try {
      await this.api.req('alergia/paciente/1', [], 'get', {}, false, false, false)
        .then(data => {
          console.log('>>>>>>>: ', data)
          this.aDadosAlergia = data
        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  editarAlergia(detalheAlarme: any) {
    console.log(detalheAlarme)
    this.navCtrl.navigateForward(['/area-paciente/alergia/detalhe-alergia'], { state: detalheAlarme });
  }

  async getAlergia() {
    try {
      await this.api.req('alergia/contar/paciente/1', [], 'get', {}, true, false, false)
        .then(data => {
          console.log('>>>>>>>: ', data)
        })
        .catch(err => {
          console.log(err)
          return err
        })
    } catch (err) {
      console.error("mensagem de erro: ", err)
      throw err;
    }
  }
}
