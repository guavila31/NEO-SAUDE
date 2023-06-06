import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DadosMedicamentoInterface, DetalheMedicoInterface, DetalhePrescricaoInterface, DetalheReceitaInterface } from 'src/app/interface/receita-interface';
import { ApiService } from 'src/app/services/api-service.service';
import { FormatadorDeDadosService } from 'src/app/services/formatador-de-dados.service';
import { IdentificadorGeneroServiceService } from 'src/app/services/identificador-genero.service';

@Component({
  selector: 'app-modal-detalhe-receita',
  templateUrl: './modal-detalhe-receita.component.html',
  styleUrls: ['./modal-detalhe-receita.component.scss'],
})
export class ModalDetalheReceitaComponent implements OnInit {
  @Input() bTemCompetencia: boolean;

  private nIdReceita: number
  private sNomeMedico: string = ''

  public bGenero: boolean = false  // false = masculino | true = feminnino

  public aDetalhePrescricao: DetalhePrescricaoInterface[] = []
  public aDetalheMedicamento: DadosMedicamentoInterface[] = []
  public aDetalheReceita: DetalheReceitaInterface | undefined
  public aDadosMedico: DetalheMedicoInterface | undefined

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private api: ApiService,
    private identGenero: IdentificadorGeneroServiceService,
    public formatadorDeData: FormatadorDeDadosService) {
    this.bTemCompetencia = this.navParams.get('bTemCompetencia');
    this.nIdReceita = this.navParams.get('nIdReceita');
    console.log('bTemCompetencia: ', this.bTemCompetencia)
    console.log('nIdReceita: ', this.nIdReceita)
  }

  ngOnInit() {
    this.getDetalheReceita()
  }

  voltar() {
    this.modalCtrl.dismiss()
  }

  async getDetalheReceita() {
    try {
      await this.api.req('receita/' + this.nIdReceita, [], 'get', {}, false, false, false)
        .then(data => {
          this.aDetalheReceita = data
          this.aDetalhePrescricao = data.listaPrescricoes
          this.aDadosMedico = data.dadosMedico
          this.sNomeMedico = this.aDadosMedico?.nome ? this.aDadosMedico.nome.split(' ')[0] : ''

          console.log('Detalhe Receita: ', this.aDetalheReceita)
          console.log('Detalhe Prescricao: ', this.aDetalhePrescricao)
          console.log('Dados Medico: ', this.aDadosMedico)
          console.log('Nome Medico: ', this.aDadosMedico?.nome)
          this.checarGenero()
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
}


