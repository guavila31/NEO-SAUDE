import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service.service';
import { MedicoInterface } from '../interface/medico-interface';
import { FormatadorDeDadosService } from '../services/formatador-de-dados.service';
import { IdentificadorGeneroServiceService } from '../services/identificador-genero.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ModalPerfilComponent } from '../modals/modal-perfil/modal-perfil.component';
import { LocalStorageService } from '../services/localstorage.service';
import { MedicamentoInterface } from '../interface/medicamento-interface';
import { PacienteInterface } from '../interface/paciente-interface';
import { AlergiaInterface } from '../interface/alergia-interface';
import { InserirPrescricao, InserirReceita } from '../interface/receita-interface';

@Component({
  selector: 'app-area-medico',
  templateUrl: './area-medico.page.html',
  styleUrls: ['./area-medico.page.scss'],
})

export class AreaMedicoPage implements OnInit {

  public iDadosMedico: MedicoInterface | undefined
  public iDadosPaciente: PacienteInterface | undefined
  public iDadosPreescricao: any[] = []
  public aListaAlergia: AlergiaInterface | any | any[] = []
  public iListaMedicamentos: any
  public sCrmMedico: any = this.localStorageService.obterCpfCrmUsuario()
  public sTituloCabecalho: string = ''

  public sIdPaciente: string | null | undefined

  public sNomeMedico: string = ''
  public sObservacaoReceita: string = ''
  public sNomeMedicoArrumado: string = ''
  public sCpfPaciente: string = ''
  public bGenero: boolean = false  // false = masculino | true = feminnino

  public bMenuPrincipal: boolean = true
  public bExisteModal: boolean = false

  public aDias: any
  public aRemedio: any
  public aHoras: any

  public aListaRemedio: any[] = []

  public bMostarModal: boolean = false


  public bMostarModalPaciente: boolean = false
  public bMostarModalAlergia: boolean = false
  public bEncontrouPaciente: boolean = false

  public bAnimacaoEntrada: boolean = false
  public bAnimacaoSaidaTooltip: boolean = false
  public bAnimacaoSaida: boolean = false

  constructor(
    private api: ApiService,
    private formatador: FormatadorDeDadosService,
    private identGenero: IdentificadorGeneroServiceService,
    private modalController: ModalController,
    private localStorageService: LocalStorageService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.getDadosMedico()
    this.getMedicamentos()
  }

  ngOnInit() {
  }

  async enviarReceita() {
    const loading = await this.loadingController.create({
      message: 'Enviando...',
      spinner: 'bubbles'
    });
    await loading.present();
    let dados = {
      "idMedico": 11,
      "cpfPaciente": this.iDadosPaciente?.cpf,
      "prescricoes": this.iDadosPreescricao,
      "observacao": this.sObservacaoReceita
    }
    console.log('dados: ', dados);
    try {
      await this.api.req('receita', [], 'post',
        dados,
        false, false, false)
        .then(data => {
          console.log('Response: ', data);
          this.alertPadrao('Sucesso!', 'Receita adicionada com sucesso!')
          this.fecharModal('G')
          loading.dismiss()
        });
    } catch (err: any) {
      console.log(err.error)
      this.alertPadrao('Atenção!', 'Algo deu errado, tente novamente')
      loading.dismiss()
      throw err;
    }
  }

  async confirmarEnvio() {
    if(this.aListaRemedio.length>0){
      const alert = await this.alertController.create({
        header: 'Atenção',
        subHeader: 'Deseja realmente enviar a receita?',
        mode: 'ios',
        buttons: [
          {text: 'Ok', handler: () => { this.enviarReceita() } },
          {text: 'Cancelar', role: 'cancel' },]
      });
      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: 'Atenção',
        subHeader: 'Nenhum medicamento foi informado',
        mode: 'ios',
        buttons: [
          {text: 'Ok', role: 'cancel' },]
      });
      await alert.present();
    }

  }

  async procurarPaciente(event: any) {
    let sCpf = event.target.value
    if (event.target.value.length === 14) {
      const loading = await this.loadingController.create({
        message: 'Procurando...',
        spinner: 'bubbles'
      });
      await loading.present();
      try {
        await this.api.req('paciente/cpf/' + this.formatador.formatarCPF(sCpf), [], 'get', {}, false, false, false)
          .then(data => {
            this.sIdPaciente = data.id
            this.iDadosPaciente = data
            console.log('Retorno ID: ', this.sIdPaciente);
            console.log('Retorno Dados: ', this.iDadosPaciente);
            this.bEncontrouPaciente = true
            this.getAlergia()
            loading.dismiss()
          });
      } catch (err: any) {
        console.log(err.error)
        this.alertPadrao('Atenção!', 'Não foi encontrado nenhum paciente com esse CPF')
        this.iDadosPaciente = {}
        this.aListaAlergia = []
        this.bEncontrouPaciente = false
        loading.dismiss()

        throw err;
      }
    }
  }

  async getAlergia() {
    try {
      await this.api.req('alergia/paciente/' + this.sIdPaciente, [], 'get', {}, true, false, false)
        .then(data => {
          this.aListaAlergia = data
          console.log('Alergias: ', this.aListaAlergia)
        })
        .catch(err => {
          console.log(err)
          return err
        })
    } catch (err) {
      console.error("mensagem de erro: ", err)
      throw err;
    }
  }

  pesquisarPaciente() {
    if (!this.bEncontrouPaciente) {
      this.alertPadrao('Atenção!', 'Nenhum paciente selecionado')
    } else {
      this.trocarTela()
    }
  }

  adicionarPaciente() {
    this.trocarTela()
  }

  adicionarRemedio() {
    if (this.aRemedio && this.aHoras && this.aDias) {
      console.log('Data: ', this.formatador.getDataHoje());
      this.aListaRemedio.push({ "idRemedio": this.aRemedio.id, "nomeRemedio": this.aRemedio.nome, "dias": `${this.aDias} DIAS`, "horas": `Medicar a cada ${this.aHoras} Horas` })
      this.iDadosPreescricao.push({ "idMedicamento": this.aRemedio.id, "quantidadeDeDias": this.aDias, "frequencia": `Medicar a cada ${this.aHoras} Horas`, "dataExpedicao": this.formatador.getDataHoje() })
      console.log('iDadosPreescricao: ', this.iDadosPreescricao);
      this.fecharModal('R')
    } else {
      this.alertPadrao('Atenção!', 'Preencha todos os dados para adicionar')
    }

  }

  async alertPadrao(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: mensagem,
      buttons: ['OK'],
      mode: 'ios'
    });

    await alert.present();
  }

  removerLista(index: number) {
    this.aListaRemedio.splice(index, 1);
  }

  async getDadosMedico(event?: any) {
    if (event)
      event.target?.complete();
    try {
      await this.api.req('medico/crm/' + this.sCrmMedico, [], 'get', {}, false, false, false)
        .then(data => {

          this.iDadosMedico = data
          this.sNomeMedico = this.formatador.formatarPrimeiroNome(data.nome)

          console.log('Médico: ', this.iDadosMedico);
          console.log('Nome Médico: ', this.sNomeMedico);

          this.checarGenero()
          this.sTituloCabecalho = 'Olá ' + (!this.bGenero ? 'Dr. ' : 'Dra. ') + this.sNomeMedico
          this.sNomeMedicoArrumado = (!this.bGenero ? 'Dr. ' : 'Dra. ') + data.nome

          console.log(this.sTituloCabecalho);

        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  async getMedicamentos() {
    try {
      await this.api.req('medicamento', [], 'get', {}, false, false, false)
        .then(data => {
          this.iListaMedicamentos = data
          console.log('Lista de Medicamentos: ', data);
        });
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  checarGenero() {
    if (this.sNomeMedico !== '') {
      this.identGenero.getGender(this.sNomeMedico)
        .then(gender => {
          console.log('Genero: ', gender)
          this.bGenero = (gender === 'female' ? true : false);
        });
    }
  }

  trocarTela() {
    this.ativarAnimacao('S')
    setTimeout(() => {
      this.bMenuPrincipal = !this.bMenuPrincipal
      this.bMostarModalPaciente = false
      this.resetarAnimacao()
    }, 750);
  }

  async abrirPerfil() {
    console.log('Dados:::', this.iDadosMedico);
    if (!this.bExisteModal) {
      const modal = await this.modalController.create({
        component: ModalPerfilComponent,
        cssClass: 'modal-filtro-receitas',
        componentProps: {
          'iDadosMedico': this.iDadosMedico
        }
      });
      return await modal.present();
    }
    this.bExisteModal = true
    this.modalController.dismiss()
  }

  abrirModal(modal: string) {
    switch (modal) {
      case 'P':
        this.bMostarModalPaciente = true
        break;
      case 'A':
        this.bMostarModalAlergia = true
        break;
      case 'R':
        this.bMostarModal = true
        this.aRemedio = null
        this.aHoras = null
        this.aDias = null
        break;

      default:
        break;
    }
  }

  ativarAnimacao(tipo: string) {
    switch (tipo) {
      case 'E':
        this.bAnimacaoEntrada = true
        break;
      case 'S':
        this.bAnimacaoSaida = true
        break;
      case 'ST':
        this.bAnimacaoSaidaTooltip = true
        break;
    }
  }

  resetarAnimacao() {
    this.bAnimacaoEntrada = false
    this.bAnimacaoSaida = false
    this.bAnimacaoSaidaTooltip = false
  }

  fecharModal(modal: string) {
    switch (modal) {
      case 'R':
        this.ativarAnimacao('S')
        setTimeout(() => {
          this.bMostarModal = false
          this.resetarAnimacao()
        }, 750);
        break;
      case 'A':
        this.ativarAnimacao('ST')
        setTimeout(() => {
          this.bMostarModalAlergia = false
          this.resetarAnimacao()
        }, 750);
        break;
      case 'P':
        this.ativarAnimacao('S')
        setTimeout(() => {
          this.bMostarModalPaciente = false
          this.resetarAnimacao()
        }, 750);
        break;
      case 'G':
        this.bMostarModalPaciente = false
        this.bMostarModal = false
        this.bMenuPrincipal = true
        this.bMostarModalAlergia = false
        break;
    }
  }

  maximoCaracteres(event: any) {
    console.log('aDias Antes: ', this.aDias);
    this.aDias = event.target.value.substr(0, 2);
    console.log('aDias Depois: ', this.aDias);
  }
}
