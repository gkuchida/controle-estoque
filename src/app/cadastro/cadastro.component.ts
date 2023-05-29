import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  opcoes = [
    {nome: 'Mercearia', valor:'1'},
    {nome: 'Limpeza', valor:'2'},
    {nome: 'Frios', valor:'3'},
    {nome: 'Frutas', valor:'4'},
    {nome: 'Verduras', valor:'5'},
    {nome: 'Bebidas', valor:'6'},
    {nome: 'Outros', valor:'7'}
  ];
  opcaoSelecionada:string;
  constructor(){
    this.opcaoSelecionada='';
    }
}

