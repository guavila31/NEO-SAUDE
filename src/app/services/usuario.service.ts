import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  @Output() usuarioAutenticado = new EventEmitter();


  constructor(public localStorageService: LocalStorageService) { }


  autenticar(usuario: any) {
    if (this.localStorageService.setarAutenticacaoLocalStorage(usuario)) {
      this.usuarioAutenticado.emit(true);
      return true;
    }
    return false;
  }

  guardarToken(token: any){
    this.localStorageService.setarToken(token.token)
  }

  deslogar(){
    this.localStorageService.logout();
    this.usuarioAutenticado.emit(false);    
  }

  seTornouAnunciante(){
   this.localStorageService.atualizarIdAnunciante(9999);
    this.usuarioAutenticado.emit(true);
  }

  estaAutenticado(){
    return this.localStorageService.obterDadosUsuarioLogado() != null;
  }

  obterDadosUsuarioLogado(){
    return this.localStorageService.obterDadosUsuarioLogado();
  }

}
