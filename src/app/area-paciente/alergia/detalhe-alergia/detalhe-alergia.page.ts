import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, LoadingController, NavController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api-service.service';
import { AlergiaInterface } from '../../../interface/alergia-interface'
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/localstorage.service';

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

  public bVaiCriar: boolean = true
  public sIdAlergia: string = ''

  public sIdUsuario: any = ''
  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.sIdUsuario = this.localStorageService.obteIdUsuario()
  }

  async ngOnInit() {
    this.sDataDiagnostico = this.formatarDataHoje()
    this.sDataReacao = this.formatarDataHoje()

    let aDetalheAlergia = this.router.getCurrentNavigation()?.extras.state;
    console.log('Alergia Selecionada: ', aDetalheAlergia);
    if (aDetalheAlergia) {
      this.bVaiCriar = false
      this.sDataDiagnostico = aDetalheAlergia['dataDiagnostico'] + 'T00:00:00'
      this.sDataReacao = aDetalheAlergia['dataUltimaReacao'] + 'T00:00:00'
      this.sTextoDescricao = aDetalheAlergia['descricao']
      this.sTextoTratamento = aDetalheAlergia['tratamento']
      this.selecionarIntensidadeMedicamento(aDetalheAlergia['intensidade'], '2')
      this.selecionarIntensidadeMedicamento(aDetalheAlergia['tipoAlergia'], '2')
      this.sIdAlergia = aDetalheAlergia['id']
      console.log('>>>: ', this.sIntensidadeSelecionada)
      console.log('>>>: ', this.sTipoSelecionado)
    } else {
      this.resetarDados()
      this.bVaiCriar = true
    }
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

  /**
   *
   * @param tipo Ver qual é o item selecionado
   * @param funcao Seleciona da funcal de alterar intensidade ou setar intensidade
   */
  selecionarIntensidadeMedicamento(tipo: string, funcao: string) {
    //Alterar intensidade ou tipo
    if (funcao === '1') {
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
    } else if (funcao === '2') { // Setar intensidade ou tipo
      switch (tipo) {
        // Intensidade
        case 'ALTA':
          this.resetarIntensidade()
          this.bIntensidadeAlta = true
          break;
        case 'MEDIA':
          this.resetarIntensidade()
          this.bIntensidadeMedia = true
          break;
        case 'BAIXA':
          this.resetarIntensidade()
          this.bIntensidadeBaixa = true
          break;

        // Tipo da alergia
        case 'Medicamento':
          this.resetarTipoAlergia()
          this.bAlergiaMedicamento = true
          break;
        case 'Alimento':
          this.resetarTipoAlergia()
          this.bAlergiaAlimento = true
          break;
        case 'Ocular':
          this.resetarTipoAlergia()
          this.bAlergiaOculares = true
          break;
        case 'Outro':
          this.resetarTipoAlergia()
          this.bAlergiaOutros = true
          break;
        case 'Pele':
          this.resetarTipoAlergia()
          this.bAlergiaPele = true
          break;
        case 'Respiratório':
          this.resetarTipoAlergia()
          this.bAlergiaRespiratorio = true
          break;

      }
    }

    console.log('Intensidade: ', this.sIntensidadeSelecionada)
    console.log('Tipo alergia: ', this.sTipoSelecionado)

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
      const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
      LOADING.present();
      try {
        await this.api.req('alergia', [], 'post', this.aCadastroAlergia, true, false, false)
          .then(data => {
            console.log('>>>>>>>: ', data)
            this.resetarDados()
            this.alertPadrao('Sucesso', 'Alergia adicionada com sucesso')
            this.navCtrl.back()
            LOADING.dismiss()
          });
      } catch (err) {
        LOADING.dismiss()
        // this.alertPadrao('Erro!', `Mensagem: ${err}`)
        console.log(err)
        throw err;
      }
    }
  }

  async alterarAlergia() {
    this.criarObjetoAlergia()
    if (this.aCadastroAlergia) {
      const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
      LOADING.present();
      try {
        await this.api.req('alergia', [], 'put', this.aCadastroAlergia, true, false, false)
          .then(data => {
            console.log('>>>>>>>: ', data)
            this.resetarDados()
            this.alertPadrao('Sucesso', 'Alergia alterada com sucesso')
            this.navCtrl.back()
            LOADING.dismiss()
          });
      } catch (err) {
        LOADING.dismiss()
        // this.alertPadrao('Erro!', `Mensagem: ${err}`)
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
        idPacienteDiagnosticado: this.sIdUsuario,
        id: this.sIdAlergia
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

  async deletarAlergia() {
    const LOADING = await this.loadingCtrl.create({ message: "Aguarde...", mode: 'ios' });
    LOADING.present();
    try {
      await this.api.req('alergia/' + this.sIdAlergia, [], 'delete', {}, false, false, false)
        .then(data => {
          console.log('>>>>>>>: ', data)
          this.resetarDados()
          this.alertPadrao('Sucesso', 'Alergia deletada com sucesso')
          this.navCtrl.back()
          LOADING.dismiss()
        });
    } catch (err) {
      LOADING.dismiss()
      console.log(err)
      throw err;
    }
    //   this.alergiaService.excluirAlergia(this.sIdAlergia).subscribe(data =>{
    //     console.log(data)
    //     LOADING.dismiss()
    //   }, error => {
    //     console.log(error)
    //     LOADING.dismiss()
    //     this.alertPadrao('Erro!', 'Error!!!')
    //   })
    //   LOADING.dismiss()
    // }
  }
}
