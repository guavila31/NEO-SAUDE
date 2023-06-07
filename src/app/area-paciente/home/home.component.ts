import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { AreaPacienteService } from '../area-paciente.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public sContagemAlta: number = 0
  public sContagemMedia: number = 0
  public sContagemBaixa: number = 0

  public sTipoAlergia: string = ''
  public sDataUltimaReacao: string = ''

  public sReceitasAtivas: string = ''

  public sIdPaciente: string | null

  get bMenuReceita(): boolean {
    return this.pacieteService.bMenuReceita;
  }

  constructor(
    private api: ApiService,
    private pacieteService: AreaPacienteService,
    public formatadorDeData: FormatadorDeDadosService,
    private localStorageService: LocalStorageService
  ) {
    this.sIdPaciente = this.localStorageService.obteIdUsuario()
  }

  ngOnInit() {
    this.sincronizar()
  }

  async sincronizar(evento?: any) {
    if (evento)
      evento.target?.complete();
    this.getContagemAlergia()
    this.getUltimaAlergia()
    this.getContarReceitasAtivas()
  }

  async recarregar(event: any) {
    setTimeout(() => {
      try {
        this.sincronizar(event)
      } catch (error) {
        console.log('Erro: ', error)
      }
    }, 1000);
  }

  resetar() {
    this.pacieteService.bMenuHome = false
    this.pacieteService.bMenuReceita = false
    this.pacieteService.bMenuHistorico = false
  }

  trocarMenu() {
    this.resetar()
    this.pacieteService.bMenuReceita = true
    console.log("Receita>", this.bMenuReceita)
  }

  async getContagemAlergia() {
    try {
      await this.api.req(
        'alergia/contar/paciente/'+ this.localStorageService.obteIdUsuario(), [], 'get', {}, false, false, false)
        .then(data => {
          this.sContagemAlta = data.alta
          this.sContagemMedia = data.medias
          this.sContagemBaixa = data.baixas
        })
        .catch(err => {
          console.log(err)
          return err
        })
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  async getUltimaAlergia() {
    try {
      await this.api.req(
        'alergia/ultimaReacao/paciente/'+ this.localStorageService.obteIdUsuario(), [], 'get', {}, false, false, false)
        .then(data => {
          console.log(data)
          this.sDataUltimaReacao = data.dataUltimaReacao
          this.sTipoAlergia = data.tipoAlergia
        })
        .catch(err => {
          console.log(err)
          return err
        })
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  async getContarReceitasAtivas() {
    try {
      await this.api.req(
        'receita/ativas/contar/'+ this.sIdPaciente, [], 'get', {}, false, false, false)
        .then(data => {
          this.sReceitasAtivas = data.toString()
        })
        .catch(err => {
          console.log(err)
          return err
        })
    } catch (err) {
      console.log(err)
      throw err;
    }
  }
}
