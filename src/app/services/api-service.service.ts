import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReqParams } from '../helpers/reqparams.helper';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private prod = environment;
  // private headers: HttpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${this.prod.appToken}`, // Adiciona o token JWT ao cabeçalho da requisição
  // });

  private headers: HttpHeaders = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Authorization', `Bearer ${this.prod.appToken}`);

  private url: string = '';

  constructor(
    private http: HttpClient
  ) {
    // console.log(this.headers)
  }

  public get getEnv(): boolean {
    return this.prod.production;
  }

  private async config(res: string, params: ReqParams[], headers: boolean, other: boolean, content: boolean): Promise<string> {
    if (this.prod.production)
      this.url = `http://${this.prod.iplocal + res}`;
    else
      this.url = `http://${this.prod.iplocal + res}`;

    params.forEach((p) => {
      this.url = this.url + p.value + '/';
    });

    return this.url;
  }

  /**
  * Realiza um requisição.
  * @param res Nome do resource (conforme API).
  * @param params Parâmetros da consulta.
  * @param type Tipo da requisição (get, post, put ou delete).
  * @param body Corpo da requisição.
  * @param headers Indica se haverá necessidade de ter cabeçalhos.
  * @param log Indica se haverá necessidade de registrar log da requisição realizada.
  * @param other Se for TRUE, indica que a consulta é em outro ponto de conexão, e não na API.
  * @param content Alternância entre o tipo de conteúdo.
  */

  public async req(
    res: string,
    params: ReqParams[],
    type: string,
    body: any,
    headers: boolean,
    log: boolean,
    other: boolean,
    content?: boolean
  ): Promise<any> {

    const url = await this.config(res, params, headers, other, content ? content : false);
    // console.log('url: ', url)
    type = type.toLowerCase();

    try {

      let serverData: HttpResponse<any> | undefined;
      if (type === 'post' || type === 'put' || type === 'patch') {
        if (content) {
          console.log('[1]')
          serverData = await this.http[type](url, body, { observe: 'response', headers: this.headers, responseType: 'blob' }).toPromise();
        } else
          console.log('[1]')
        serverData = await this.http[type](url, body, { observe: 'response', headers: this.headers }).toPromise();
      } else if (type === 'delete') {
        console.log('[1]')
        serverData = await this.http.delete(url, { observe: 'response', headers: this.headers }).toPromise();
      } else {

        if (content) {
          serverData = await this.http.get(url, { observe: 'response', headers: this.headers, responseType: 'blob' }).toPromise();
        } else {
          // console.log(this.headers)
          serverData = await this.http.get(url, { observe: 'response', headers: this.headers }).toPromise();
          console.log('Serverdata :', serverData)

        }
      }

      if (content) {
        return serverData?.body;
      }
      return serverData?.body
      // return JSON.parse(JSON.stringify(lib.decodeJSON(JSON.stringify(serverData.body), true)));
    } catch (error: any) {
      throw (error);
    }
  }

    public async getReq(url: string) {
      // const headers: HttpHeaders = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${this.prod.appToken}`, // Adiciona o token JWT ao cabeçalho da requisição
      // });
      let resposta
      const headers: HttpHeaders = await new HttpHeaders()
      .set('Authorization', `Bearer ${this.prod.appToken}`);
      setTimeout(async () => {
        console.log('headers: ', headers)
        console.log('passou')
        resposta = await this.http.get('http://localhost:8080/api/' + url, { headers }).toPromise();
      }, 3000);
      return resposta
    }

  // public async postReq(url: string, body: any) {
  //   let resposta = await this.http.post('http://localhost:8080/api/' + url, body).toPromise();
  //   return resposta
  // }

  // public async putReq(url: string, body: any) {
  //   let resposta = await this.http.post('http://localhost:8080/api/' + url, body).toPromise();
  //   return resposta
  // }

  // public async deleteReq(url: string) {
  //   let resposta = await this.http.delete('http://localhost:8080/api/' + url).toPromise();
  //   return resposta
  // }
}
