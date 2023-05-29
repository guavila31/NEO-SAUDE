import { Component, OnInit } from '@angular/core';
import { AreaPacienteService } from 'src/app/area-paciente/area-paciente.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss'],
})
export class RodapeComponent implements OnInit {

  constructor(
    private pacieteService: AreaPacienteService
  ) {}

  ngOnInit() {
    // this.bMenuHome = true
  }

  get bMenuHome(): boolean {
    return this.pacieteService.bMenuHome;
  }

  get bMenuReceita(): boolean {
    return this.pacieteService.bMenuReceita;
  }

  get bMenuHistorico(): boolean {
    return this.pacieteService.bMenuHistorico;
  }
  resetar() {
    this.pacieteService.bMenuHome = false
    this.pacieteService.bMenuReceita = false
    this.pacieteService.bMenuHistorico = false
  }

  trocarMenu(menu: string) {
    switch (menu) {
      case 'receita':
        this.resetar()
        this.pacieteService.bMenuReceita = true
        console.log("Receita>", this.bMenuReceita)
        break;
      case 'home':
        this.resetar()
        this.pacieteService.bMenuHome = true
        console.log("Home>", this.bMenuHome)
        break;
      case 'historico':
        this.resetar()
        this.pacieteService.bMenuHistorico = true
        console.log("Historico>", this.bMenuHistorico)
        break;
    }
  }

}
