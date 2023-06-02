import { Component, OnInit } from '@angular/core';
import { AreaPacienteService } from './area-paciente.service';

@Component({
  selector: 'app-area-paciente',
  templateUrl: './area-paciente.page.html',
  styleUrls: ['./area-paciente.page.scss'],
})
export class AreaPacientePage implements OnInit {

  public bPaginaHome: boolean = false
  public bPaginaReceita: boolean = false
  public bPaginaHistorico: boolean = false
  constructor(
    public pacieteService: AreaPacienteService
  ) {
    this.bPaginaHome = this.pacieteService.bMenuHome
  }

  ngOnInit() {
  }

}
