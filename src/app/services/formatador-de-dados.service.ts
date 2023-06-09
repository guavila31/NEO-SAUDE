import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatadorDeDadosService {

  constructor() { }

  /**
   * @param data recebe uma data no formato aaaa-mm-dd
   * @returns retorna dd/mm/aaaa
   */
  formatarDataDDMMAAAA(data: any): string | null {
    const partes = data.split('-');
    const ANO = partes[0];
    const MES = partes[1];
    const DIA = partes[2];
    const dataFormatada = `${DIA}/${MES}/${ANO}`;
    return dataFormatada;
  }

  /**
   * @param data recebe uma data no formato ddmmaaaa
   * @returns retorna AAAA-MM-DD
   */
  formatarDataAAAAMMDD(data: any): string | null {
    console.log('data recebida: ', data);
    if (data.includes('/')) {
      data = data.replace(/\//g, '');
    } 
      console.log('formatou: ', data);
      const DIA = data.substr(0, 2);
      console.log('dia:', DIA);
      const MES = data.substr(2, 2);
      console.log('mes:', MES);
      const ANO = data.substr(4, 4);
      console.log('ano:', ANO);
      const dataFormatada = `${ANO}-${MES}-${DIA}`;
      console.log('dataFormatada: ',dataFormatada);
      return dataFormatada;
    
  }

  formatarPrimeiroNome(nomeCompleto: string) {
    const primeiroNome = nomeCompleto.split(' ')[0];
    return primeiroNome;
  }

  formatarCPF(cpf: any): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  obterIniciais(nomeCompleto: any): string {
    const nomes = nomeCompleto.split(' ');
    const primeiraLetraPrimeiroNome = nomes[0].charAt(0).toUpperCase();
    const primeiraLetraUltimoNome = nomes[nomes.length - 1].charAt(0).toUpperCase();

    return primeiraLetraPrimeiroNome + primeiraLetraUltimoNome;
  }

  removePontosTracos(texto: any): string {
    // Remove pontos e traços substituindo-os por uma string vazia
    const textoSemPontosTracos = texto.replace(/[.\-]/g, '');
    return textoSemPontosTracos;
  }

  /**
   * @returns retorna a data de hoje formatada em AAAA-MM-DD
   */
  getDataHoje(): string {
    const HOJE = new Date();
    const ANO = HOJE.getFullYear();
    const MES = (HOJE.getMonth() + 1).toString().padStart(2, '0');
    const DIA = HOJE.getDate().toString().padStart(2, '0');
    const dataFormatada = `${ANO}-${MES}-${DIA}`;
    return dataFormatada
  }

}
