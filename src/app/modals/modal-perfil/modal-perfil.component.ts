import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss'],
})
export class ModalPerfilComponent  implements OnInit {

  public fbDadosPerfil: FormGroup
  public sEmail: any = ''
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) {
    this.fbDadosPerfil = this.fb.group({
      NOME: [, Validators.required],
      CPF: [],
      CRM: [],
      CELULAR: [, Validators.required],
      EMAIL: [, Validators.required, Validators.email],
      DATANASCIMENTO: [, Validators.required]
    })
   }

  ngOnInit() {}

  salvarPerfil(){}

  sair(){
    this.modalController.dismiss()
  }
}
