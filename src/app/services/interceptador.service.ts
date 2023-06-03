import { Injectable, Inject, LOCALE_ID } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, filter, tap } from 'rxjs/operators';
import { LocalStorageService } from "./localstorage.service";
import { UsuarioService } from "./usuario.service";


/** Pass untouched request through to the next request handler. */
@Injectable()
export class InterceptadorService implements HttpInterceptor {
    private token: string = "";

    constructor(
        private localStorage: LocalStorageService,
        private usuarioService: UsuarioService,
        @Inject(LOCALE_ID) public locale: string
    ) {

    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {        
        let headers = req.headers.set('Authorization', 'Bearer ' + token) ;
        return req.clone({ headers });
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {        
        let autenticacao = this.localStorage.obterDadosAutenticacao();
        let usuario = null;
        if (autenticacao != null && autenticacao.token != null) {
            this.token = autenticacao.token;
            usuario = autenticacao.usuario;
        }
        let idCliente = this.localStorage.obterIdCliente();

        return next.handle(this.addToken(req, this.token))
            .pipe(
                filter(event => event instanceof HttpResponse),
                tap((event) => {
                    let retorno: any = event;
                    //if (retorno != null && retorno.headers != null) {
                    //    let idCliente = retorno.headers.get("idcliente");
                    //    if (idCliente != null && idCliente != "") {
                    //        this.localStorage.setarIdCliente(idCliente);
                     //   }
                   // }
                })
            )
            .pipe(
                catchError(error => {
                    if (error instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>error).status) {
                            case 401:
                                return this.handle401Error(req, next);
                            case 403:
                                return this.handle401Error(req, next);
                            default:
                                return this.handle400Error(error);
                        }
                    } else {
                        return throwError(error);
                    }
                }));
    }

    handle400Error(error: any) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            return this.logoutUser();
        }

        return throwError(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        return this.logoutUser();
    }

    logoutUser() {
        this.usuarioService.deslogar();
        return throwError("Sua sessão expirou, por favor faça o login novamente");
    }
}