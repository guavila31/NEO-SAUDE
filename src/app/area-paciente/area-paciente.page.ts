import { Component, OnInit } from '@angular/core';
import { AreaPacienteService } from './area-paciente.service';
import { ApiService } from '../services/api-service.service';
import { PacienteInterface } from '../interface/paciente-interface';

@Component({
  selector: 'app-area-paciente',
  templateUrl: './area-paciente.page.html',
  styleUrls: ['./area-paciente.page.scss'],
})
export class AreaPacientePage implements OnInit {

  public bPaginaHome: boolean = false
  public bPaginaReceita: boolean = false
  public bPaginaHistorico: boolean = false

  private sIdPaciente: string = '1'

  public iDadosPaciente: PacienteInterface[]=[]

  constructor(
    public pacieteService: AreaPacienteService,
    private api: ApiService
  ) {
    this.bPaginaHome = this.pacieteService.bMenuHome

  }

  ngOnInit() {
  }

  async getDadosPaciente(event?: any) {
    if (event)
      event.target?.complete();
    try {
      await this.api.req('paciente/' + this.sIdPaciente, [], 'get', {}, false, false, false)
        .then(data => {
          this.iDadosPaciente = data
        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

}
