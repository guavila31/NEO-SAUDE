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
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getListaAlergia()
  }

  formatarData(data: string): string | null {
    const dateObj = new Date(data);
    let novaData = this.datePipe.transform(dateObj, 'dd/MM/yyyy');
    return novaData
  }

  async getListaAlergia() {
    try {
      await this.api.getReq('alergia/paciente/1')
        .then((data: any) => {
          this.aDadosAlergia = data
          console.log(data)
        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  editarAlergia(detalheAlarme: any) {
    console.log(detalheAlarme)
    this.navCtrl.navigateForward('/area-paciente/alergia/detalhe-alergia');
  }
}
