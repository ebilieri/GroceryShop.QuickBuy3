import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../modelo/usuario';
import { UsuarioServico } from '../../servicos/usuario/usuario.servico';

@Component({
  selector: 'pesquisa-usuario',
  templateUrl: './pesquisa.usuario.component.html',
  styleUrls: ['./pesquisa.usuario.component.css']
})

export class PesquisaUsuarioComponent implements OnInit {

  public usuarios: Usuario[];

  ngOnInit(): void {
    sessionStorage.setItem('usuarioSessao', '');
  }

  constructor(private usuarioServico: UsuarioServico, private router: Router, private toast: ToastrService) {
    // carregar usuarios ao iniciar
    this.carregarUsuarios();
  }


  private carregarUsuarios() {
    this.usuarioServico.obterTodosUsuarios()
      .subscribe(usuarios_data => {
        this.usuarios = usuarios_data;
      }, erro => {
          console.log(erro.error);
          this.toast.error(erro.error, "Erro!");
      });
  }

  public adicionarUsuario() {
    this.router.navigate(['/usuario']);
  }

  

  public editarUsuario(usuario: Usuario) {
    sessionStorage.setItem('usuarioSessao', JSON.stringify(usuario));
    this.router.navigate(['/usuario']);
  }
}
