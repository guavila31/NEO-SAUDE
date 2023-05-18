import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  public sContagemAlta: number = 0
  public sContagemMedia: number = 0
  public sContagemBaixa: number = 0
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAlergia()
  }

  async getAlergia(){
    try {
      await this.api.getReq('alergia/contar/paciente/1')
        .then((data: any) => {
          this.sContagemAlta = data.alta
          this.sContagemMedia = data.medias
          this.sContagemBaixa = data.baixas
        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

}
