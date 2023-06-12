import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router, private location: Location){}

  voltar(){
    this.location.back();
  }
  isCadastro(){
    return this.router.url.includes('/cadastro');
  }
  isVisualizar(){
    return this.router.url.includes('/visualizar');
  }
  isDetalhes(){
    return this.router.url.includes('/detalhes');
  }
  isExcluir(){
    return this.router.url.includes('/excluir');
  }
  isAtualizar(){
    return this.router.url.includes('/atualizar');
  }
  isEditar(){
    return this.router.url.includes('/editar');
  }
}
