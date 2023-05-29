import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent  implements OnInit {
  @Input() sTituloCabecalho: string;
  constructor() {
    this.sTituloCabecalho = 'Olá, Gustavo'
   }

  ngOnInit() {}

}
