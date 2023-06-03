import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { PacienteInterface } from 'src/app/interface/paciente-interface';
import { ApiService } from 'src/app/services/api-service.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss'],
})
export class ModalPerfilComponent  implements OnInit {

  public sEmail: any = ''

  private sIdPaciente: string = '1'
  public iDadosPaciente: PacienteInterface
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public formatador: FormatadorDeDadosService
  ) {
    this.iDadosPaciente = this.navParams.get('iDadosPaciente');
    console.log('Paciente: ', this.iDadosPaciente)
   }

  ngOnInit() {
  }

  salvarPerfil(){}

  sair(){
    this.modalController.dismiss()
  }
}
