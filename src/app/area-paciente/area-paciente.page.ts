import { Component, OnInit } from '@angular/core';
import { AreaPacienteService } from './area-paciente.service';
import { ApiService } from '../services/api-service.service';
import { PacienteInterface } from '../interface/paciente-interface';
import { LocalStorageService } from '../services/localstorage.service';
import { FormatadorDeDadosService } from '../services/formatador-de-dados.service';

@Component({
  selector: 'app-area-paciente',
  templateUrl: './area-paciente.page.html',
  styleUrls: ['./area-paciente.page.scss'],
})
export class AreaPacientePage implements OnInit {

  public bPaginaHome: boolean = false
  public bPaginaReceita: boolean = false
  public bPaginaHistorico: boolean = false

  private sIdPaciente: string | null

  public iDadosPaciente: PacienteInterface[] = []

  constructor(
    public pacieteService: AreaPacienteService,
    private api: ApiService,
    private localStorageService: LocalStorageService,
    private formatador: FormatadorDeDadosService
  ) {
    this.bPaginaHome = this.pacieteService.bMenuHome
    this.sIdPaciente = this.localStorageService.obteIdUsuario()
    // this.getDadosPaciente()
  }

  ngOnInit() {}

  // async getDadosPaciente(event?: any) {
  //   if (event)
  //     event.target?.complete();
  //   try {
  //     await this.api.req('paciente/cpf/' + this.formatador.formatarCPF(this.sIdPaciente), [], 'get', {}, false, false, false)
  //     .then(data => {
  //       console.log('Retorno: ', data);
  //       console.log('Retorno: ', data.id);
  //       this.sIdPaciente = data.id
  //       this.iDadosPaciente = data
  //     });
  //   } catch (err) {
  //     console.log(err)
  //     throw err;
  //   }
  // }

}
