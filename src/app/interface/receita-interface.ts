/* Detalhe da Receita */

export interface DetalheReceitaInterface {
  ativo: boolean;
  idReceita: number;
  idPaciente: number;
  nomePaciente: string;
  nomeClinica: string;
  dadosMedico: DetalheMedicoInterface;
  dataExpedicao: string;
  listaPrescricoes: DetalhePrescricaoInterface[];
  observacao: string;
}

export interface DetalhePrescricaoInterface {
  idPrescricao: number;
  quantidadeDias: number;
  frequencia: string;
  dataExpedicao: string;
  ativo: boolean;
  dadosMedicamento: DadosMedicamentoInterface;
}

export interface DadosMedicamentoInterface {
  id: number;
  nome: string;
}

export interface DetalheMedicoInterface {
  crm: string;
  nome: string;
  especialidade: string;
  clinica: string;
  dataNascimento: string;
  email: string;
  celular: string;
}

/* Listagem de Receitas */

export interface ListaReceitaInterface {
  id: number;
  dataExpedicao: string;
  ativo: boolean;
  observacao: string;
  prescricao: ListaPrescricaoInterface[];
}

export interface ListaPrescricaoInterface {
  id: number;
  quantidadeDias: number;
  frequencia: string;
  dataExpedicao: string;
  ativo: boolean;
}


export interface InserirReceita {
  idMedico?:    number;
  cpfPaciente?: string;
  prescricao?:  InserirPrescricao[];
  observacao?:  string;
}

export interface InserirPrescricao {
  quantidadeDeDias?: number;
  frequencia?:       string;
  dataExpedicao?:    string;
  idMedicamento?:    number;
}

