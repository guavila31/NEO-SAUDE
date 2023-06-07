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
    const DIA = data.substr(0, 2);
    const MES = data.substr(2, 2);
    const ANO = data.substr(4, 4);
    const dataFormatada = `${ANO}-${MES}-${DIA}`;
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

}
