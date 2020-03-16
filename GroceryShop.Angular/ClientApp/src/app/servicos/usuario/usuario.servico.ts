import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../modelo/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServico {

  private baseURL: string;
  private _usuario: Usuario;

  get usuario(): Usuario {
    let usuario_json = sessionStorage.getItem("usuario-autenticado");
    this._usuario = JSON.parse(usuario_json);
    return this._usuario;
  }

  set usuario(usuario: Usuario) {
    sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
    this._usuario = usuario;
  }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public usuarioAutenticado(): boolean {
    return this._usuario != null && this._usuario.email != "" && this._usuario.senha != "";
  }

  public usuarioAdministrador(): boolean {    
    return this.usuarioAutenticado() && this._usuario != null && this.usuario.ehAdministrador;    
  }

  public limparSessao(): void {
    sessionStorage.setItem("usuario-autenticado", "");
    this._usuario = null;
  }

  public verificarUsuario(usuario: Usuario): Observable<Usuario> {

    // url raiz + endereço do serviço a ser chamado ex.: https://www.groceryshop.com/
    return this.http.post<Usuario>(this.baseURL + 'api/usuario/VerificarUsuario', JSON.stringify(usuario), { headers: this.headers });
  }

  /*
   * Cadastrar novo usuario
   */
  public cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    usuario.tipoPessoa = Number(usuario.tipoPessoaForm);
    return this.http.post<Usuario>(this.baseURL + 'api/usuario', JSON.stringify(usuario), { headers: this.headers });
  }


  public obterTodosUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.baseURL + 'api/usuario');
  }
}
