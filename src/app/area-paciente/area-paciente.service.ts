import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AreaPacienteService {

  public _bMenuHome: boolean = true;
  public _bMenuReceita: boolean = false;
  public _bMenuHistorico: boolean = false;

  public get bMenuHome(): boolean { return this._bMenuHome; }
  public get bMenuReceita(): boolean { return this._bMenuReceita; }
  public get bMenuHistorico(): boolean { return this._bMenuHistorico; }

  public set bMenuHome(value: boolean) { this._bMenuHome = value; }
  public set bMenuReceita(value: boolean) { this._bMenuReceita = value; }
  public set bMenuHistorico(value: boolean) { this._bMenuHistorico = value; }

  constructor() { }

  // trocarMenu(menu: string) {
  //   this.bMenuHome = menu === 'home';
  //   this.bMenuReceita = menu === 'receita';
  //   this.bMenuHistorico = menu === 'historico';
  // }

  resetar() {
    this.bMenuHome = false
    this.bMenuReceita = false
    this.bMenuHistorico = false
  }
  trocarMenu(menu: string) {
    switch (menu) {
      case 'receita':
        this.resetar()
        this.bMenuReceita = true
        console.log("Receita>", this.bMenuReceita)
        break;
      case 'home':
        this.resetar()
        this.bMenuHome = true
        console.log("Home>", this.bMenuHome)
        break;
      case 'historico':
        this.resetar()
        this.bMenuHistorico = true
        console.log("Historico>", this.bMenuHistorico)
        break;
    }
  }
}
