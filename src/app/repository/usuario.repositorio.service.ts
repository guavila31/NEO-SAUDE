import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class UsuarioRepositorioService {

    constructor(private http: HttpClient) { }

    cadastrarPaciente(usuario : any){
        return this.http.post(`${environment.API_URL}api/paciente`, usuario);
    }

    cadastrarMedico(usuario : any){
        return this.http.post(`${environment.API_URL}api/medico`, usuario);
    }

    autenticar(usuario: any){
        return this.http.post(`${environment.API_URL}login`, usuario);
    }

    recuperarSenha(usuario: any){
        return this.http.post(`${environment.API_URL}Usuarios/esqueci-senha`, usuario);
    }
    
    alterarSenha(usuario: any){
        return this.http.post(`${environment.API_URL}Usuarios/atualizar-senha`, usuario);
    }

   /* obterHistoricoAcesso(take, skip){
        return this.http.get(`${environment.API_URL}Usuarios/historico-acesso?take=${take}&skip=${skip}`);
    }
    
    validarCodigo(usuario: any){
        return this.http.post(`${environment.API_URL}Usuarios/validar-codigo`, usuario);
    }*/

    /*
    alterarFoto(usuario: any){
        return this.http.put(`${environment.API_URL}Usuarios/foto`, usuario);
    }

    verificarToken(){
        return this.http.get(`${environment.API_URL}Usuarios/verificar-token`);
    }

    obterInformacoesPessoais(){
        return this.http.get(`${environment.API_URL}Usuarios/informacoes-pessoais`);
    }

    atualizarInformacoesPessoais(model){
        return this.http.put(`${environment.API_URL}Usuarios/informacoes-pessoais`, model);
    }

    atualizarNotificacoes(model){
        return this.http.put(`${environment.API_URL}Usuarios/notificacoes`, model);
    }
    */
}
