import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
}
