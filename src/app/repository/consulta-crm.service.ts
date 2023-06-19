import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCrmService {

  //https://www.consultacrm.com.br/api/index.php?tipo=crm&q=Paulo%20Cavalcante%20Muzy&chave=6189487048&destino=json

  constructor(private http: HttpClient) { }

  buscarCrm(busca: string): any {
    this.http.get(`https://www.consultacrm.com.br/api/index.php?tipo=crm&q=${busca}&chave=6189487048&destino=json`).subscribe((response: any) => {
      console.log(response.item);
      return response.item
    }, (error) => {
      console.error(error);
    });;
  }

}
