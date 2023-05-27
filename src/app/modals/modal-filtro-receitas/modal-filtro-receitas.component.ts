import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-filtro-receitas',
  templateUrl: './modal-filtro-receitas.component.html',
  styleUrls: ['./modal-filtro-receitas.component.scss'],
})
export class ModalFiltroReceitasComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;

  public especialidades: string=''
  public sDataInicio: string = ''
  public sDataFinal: string = ''
  public aDataSelecionada: string = ''
  constructor(private modalCtrl: ModalController) {
    this.sDataInicio = this.formatarDataHoje()
    this.sDataFinal = this.formatarDataHoje()
   }

  ngOnInit() { }

  voltar(){
    this.modalCtrl.dismiss()
  }

  especialidadeSelecionada(){
    console.log('Selecionado: ', this.especialidades)
  }

  formatarDataHoje(data?: any) {
    const HOJE = new Date();
    const ANO = HOJE.getFullYear();
    const MES = (HOJE.getMonth() + 1).toString().padStart(2, '0');
    const DIA = HOJE.getDate().toString().padStart(2, '0');
    const dataFormatada = `${ANO}-${MES}-${DIA}`;
    return dataFormatada
  }

  confirmar(event: any, tipo: string) {
    this.aDataSelecionada = event.detail.value;
    this.aDataSelecionada = this.aDataSelecionada.split("T")[0];
    console.log(this.aDataSelecionada)
    switch (tipo) {
      case 'I':
        console.log('Data Inicio: ', this.sDataInicio)
        console.log('Selecionada: ', this.aDataSelecionada)
        this.sDataInicio = this.aDataSelecionada
        break;
      case 'F':
        console.log('Data Final: ', this.sDataFinal)
        console.log('Selecionada: ', this.aDataSelecionada)
        this.sDataFinal = this.aDataSelecionada
        break;
    }
    console.log('data: ', this.aDataSelecionada)
    console.log('modal: ', this.modal)
    this.modal?.dismiss(this.aDataSelecionada, 'confirm');
    this.modal?.onWillDismiss()
  }

}
