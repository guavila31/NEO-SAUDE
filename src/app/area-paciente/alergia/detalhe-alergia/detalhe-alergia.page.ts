import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, LoadingController, NavController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api-service.service';
import { AlergiaInterface } from '../../../interface/alergia-interface'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-alergia',
  templateUrl: './detalhe-alergia.page.html',
  styleUrls: ['./detalhe-alergia.page.scss'],
})
export class DetalheAlergiaPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;

  public sDataDiagnostico: string = ''
  public sDataReacao: string = ''

  public sTextoDescricao: string = ''
  public sTextoTratamento: string = ''

  public sIntensidadeSelecionada: string = ''
  public sTipoSelecionado: string = ''

  public bIntensidadeAlta: boolean = false
  public bIntensidadeMedia: boolean = false
  public bIntensidadeBaixa: boolean = false

  public bAlergiaMedicamento: boolean = false
  public bAlergiaAlimento: boolean = false
  public bAlergiaRespiratorio: boolean = false
  public bAlergiaPele: boolean = false
  public bAlergiaOculares: boolean = false
  public bAlergiaOutros: boolean = false

  public aDataSelecionada: any

  public aCadastroAlergia: AlergiaInterface = {}
  public bEstaValido: boolean = false

  public sTipoAcao: string = 'A'
  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private navParams: NavParams
  ) {
  }

  ionViewDidEnter() {
    console.log(this.activatedRoute.snapshot)
    const objetoRecebido = 'this.activatedRoute.snapshot.state.objeto';
    // const objetoRecebido = this.activatedRoute.snapshot.state.objeto;
    // Faça o que você precisa com o objeto recebido
    console.log(objetoRecebido)
    if (objetoRecebido)
      this.sTipoAcao = 'E'
    else
      this.sTipoAcao = 'A'
  }

  ngOnInit() {
    this.sDataDiagnostico = this.formatarDataHoje()
    this.sDataReacao = this.formatarDataHoje()
  }

  resetarDados() {
    this.resetarIntensidade()
    this.resetarTipoAlergia()
    this.sTextoDescricao = ''
    this.sTextoTratamento = ''
    this.sDataDiagnostico = this.formatarDataHoje()
    this.sDataReacao = this.formatarDataHoje()
  }

  formatarDataHoje(data?: any) {
    const HOJE = new Date();
    const ANO = HOJE.getFullYear();
    const MES = (HOJE.getMonth() + 1).toString().padStart(2, '0');
    const DIA = HOJE.getDate().toString().padStart(2, '0');
    const dataFormatada = `${ANO}-${MES}-${DIA}`;
    return dataFormatada
  }

  resetarIntensidade() {
    this.bIntensidadeAlta = false
    this.bIntensidadeMedia = false
    this.bIntensidadeBaixa = false
    this.sIntensidadeSelecionada = ''
  }

  resetarTipoAlergia() {
    this.bAlergiaMedicamento = false
    this.bAlergiaAlimento = false
    this.bAlergiaRespiratorio = false
    this.bAlergiaPele = false
    this.bAlergiaOculares = false
    this.bAlergiaOutros = false
    this.sTipoSelecionado = ''
  }

  selecionarIntensidade(tipo: string) {
    switch (tipo) {
      //Selecao de intensidade
      case 'A':
        this.resetarIntensidade()
        this.bIntensidadeAlta = true
        this.sIntensidadeSelecionada = 'ALTA'
        break;
      case 'M':
        this.resetarIntensidade()
        this.bIntensidadeMedia = true
        this.sIntensidadeSelecionada = 'MEDIA'
        break;
      case 'B':
        this.resetarIntensidade()
        this.bIntensidadeBaixa = true
        this.sIntensidadeSelecionada = 'BAIXA'
        break;

      // Selecao de tipo de alergia
      case 'AM':
        this.resetarTipoAlergia()
        this.bAlergiaMedicamento = true
        this.sTipoSelecionado = 'Medicamento'
        break;
      case 'AA':
        this.resetarTipoAlergia()
        this.bAlergiaAlimento = true
        this.sTipoSelecionado = 'Alimento'
        break;
      case 'AO':
        this.resetarTipoAlergia()
        this.bAlergiaOculares = true
        this.sTipoSelecionado = 'Ocular'
        break;
      case 'AU':
        this.resetarTipoAlergia()
        this.bAlergiaOutros = true
        this.sTipoSelecionado = 'Outro'
        break;
      case 'AP':
        this.resetarTipoAlergia()
        this.bAlergiaPele = true
        this.sTipoSelecionado = 'Pele'
        break;
      case 'AR':
        this.resetarTipoAlergia()
        this.bAlergiaRespiratorio = true
        this.sTipoSelecionado = 'Respiratório'
        break;
    }
    // console.log('Medicamento: ',this.bAlergiaMedicamento)
    // console.log('Alimento: ',this.bAlergiaAlimento)
    // console.log('Respiratório: ',this.bAlergiaRespiratorio)
    // console.log('Pele: ',this.bAlergiaPele)
    // console.log('Ocular: ',this.bAlergiaOculares)
    // console.log('Outros: ',this.bAlergiaOutros)

    // console.log('Alta: ',this.bIntensidadeAlta)
    // console.log('Media: ',this.bIntensidadeMedia)
    // console.log('Baixa: ',this.bIntensidadeBaixa)

  }

  confirmar(event: any, tipo: string) {
    this.aDataSelecionada = event.detail.value;
    this.aDataSelecionada = this.aDataSelecionada.split("T")[0];
    console.log(this.aDataSelecionada)

    switch (tipo) {
      case 'D':
        this.sDataDiagnostico = this.aDataSelecionada
        break;
      case 'U':
        this.sDataReacao = this.aDataSelecionada
        break;
    }
    console.log('data: ', this.aDataSelecionada)
    this.modal?.dismiss(this.aDataSelecionada, 'confirm');
  }

  async criarAlergia() {
    this.criarObjetoAlergia()
    if (this.aCadastroAlergia) {
      const LOADING = await this.loadingCtrl.create({
        message: "Aguarde...",
        mode: 'ios'
      });
      LOADING.present();
      try {
        await this.api.postReq('alergia', this.aCadastroAlergia)
          .then((data: any) => {
            this.resetarDados()
            this.alertPadrao('Sucesso', 'Alergia adicionada com sucesso')
            this.navCtrl.back()
            LOADING.dismiss()
          });
      } catch (err) {
        LOADING.dismiss()
        console.log(err)
        throw err;
      }
    }
  }

  criarObjetoAlergia(): boolean {
    if (
      !this.bIntensidadeAlta &&
      !this.bIntensidadeMedia &&
      !this.bIntensidadeBaixa) {
      this.aCadastroAlergia = {}
      this.alertPadrao('ATENÇÃO!', 'Preencha a intensidade da alergia')
      return false
    } else if (
      !this.bAlergiaMedicamento &&
      !this.bAlergiaAlimento &&
      !this.bAlergiaOculares &&
      !this.bAlergiaOutros &&
      !this.bAlergiaPele &&
      !this.bAlergiaRespiratorio) {
      this.aCadastroAlergia = {}
      this.alertPadrao('ATENÇÃO!', 'Preencha o tipo da alergia')
      return false
    } else {
      this.aCadastroAlergia = {
        dataDiagnostico: this.sDataDiagnostico,
        dataUltimaReacao: this.sDataReacao,
        descricao: this.sTextoDescricao,
        tratamento: this.sTextoTratamento,
        intensidade: this.sIntensidadeSelecionada,
        tipoAlergia: this.sTipoSelecionado,
        idPacienteDiagnosticado: 1
      }
      console.log(this.aCadastroAlergia)
      return true
    }
  }

  async alertPadrao(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      subHeader: mensagem,
      mode: 'ios',
      buttons: ['OK']
    });
    alert.present();
  }
}
