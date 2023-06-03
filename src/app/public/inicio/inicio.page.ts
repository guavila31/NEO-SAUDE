import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})
export class InicioPage {

  public sTipoUsuario: 'médico' | 'paciente' = 'médico'
  public bEMedico: boolean = false
  public bELogin: boolean = true

  constructor(private api: ApiService) {}

  registrar(){}

  entrar(){}

  alterarTipoUsuario(){
    this.bEMedico = !this.bEMedico

    if(this.bEMedico)
      this.sTipoUsuario = 'paciente'
    else
      this.sTipoUsuario = 'médico'
    console.log('Usuario: ', this.bEMedico);
  }

  alterarTipoEntrada(){
    this.bELogin = !this.bELogin
    console.log('login: ', this.bELogin);
  }
}
