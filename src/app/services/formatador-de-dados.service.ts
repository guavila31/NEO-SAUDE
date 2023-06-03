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

}
