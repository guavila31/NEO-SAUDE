import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatadorDeDadosService {

  constructor() { }

  formatarData(data: any): string | null {
    const partes = data.split('-');
    const ANO = partes[0];
    const MES = partes[1];
    const DIA = partes[2];
    const dataFormatada = `${DIA}/${MES}/${ANO}`;
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
