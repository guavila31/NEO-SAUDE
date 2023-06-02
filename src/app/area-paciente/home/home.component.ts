import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { AreaPacienteService } from '../area-paciente.service';

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

  get bMenuReceita(): boolean {
    return this.pacieteService.bMenuReceita;
  }

  constructor(
    private api: ApiService,
    private pacieteService: AreaPacienteService) { }

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
        'alergia/contar/paciente/1', [], 'get', {}, false, false, false)
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
        'alergia/ultimaReacao/paciente/1', [], 'get', {}, false, false, false)
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
        'receita/ativas/contar/1', [], 'get', {}, false, false, false)
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

  formatarData(data: any): string | null {
    const partes = data.split('-');
    const ANO = partes[0];
    const MES = partes[1];
    const DIA = partes[2];
    const dataFormatada = `${DIA}/${MES}/${ANO}`;
    return dataFormatada;
  }

}
