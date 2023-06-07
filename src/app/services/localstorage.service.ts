import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setarAutenticacaoLocalStorage(objAutenticado: any): boolean {
    if (objAutenticado && objAutenticado.token) {
      localStorage.setItem("usuarioAutenticadoNeoSaude", JSON.stringify(objAutenticado.token));
      return true;
    }
    return false;
  }

  obterDadosAutenticacao() {
    return JSON.parse(localStorage.getItem('usuarioAutenticadoNeoSaude') || '{}');
  }

  atualizarIdAnunciante(idAnunciante: any){
    var jsonDadosAutenticado = JSON.parse(localStorage.getItem('usuarioAutenticadoNeoSaude') || '{}');
    jsonDadosAutenticado.usuario.idAnunciante = idAnunciante;
    localStorage.setItem("usuarioAutenticadoNeoSaude", JSON.stringify(jsonDadosAutenticado));
  }

  setarToken(token: string){
    localStorage.setItem("token", token);
  }
  
  /**
   * 
   * @param idUsuario CPF ou CNPJ do usuario
   */
  setarCpfCrmUsuario(idUsuario: any){
    console.log('ID: ', idUsuario);
    localStorage.setItem("usuarioCpfCrm", idUsuario);
  }

  setarIdUsuario(idUsuario: any){
    localStorage.setItem("idUsuario", idUsuario);
  }

  obterCpfCrmUsuario(){
    return localStorage.getItem('usuarioCpfCrm');
  }

  obteIdUsuario() : any{
    return localStorage.getItem('idUsuario');
  }

  obterDadosUsuarioLogado() {
    var jsonDadosAutenticado = JSON.parse(localStorage.getItem('usuarioAutenticadoNeoSaude') || '{}');

    if(jsonDadosAutenticado){
      return jsonDadosAutenticado.usuario;
    }

    return null;
  }

  logout() {
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('usuarioCpfCrm');
    localStorage.removeItem('usuarioAutenticadoNeoSaude');
  }
}
