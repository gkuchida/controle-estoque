import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent {
  nome: string = '';
  marca: string = '';
  quantidade: number = 0;
  selectedCategoria: string;
  selectedLocal: string;
  selectedUnidade: string;
  selectedEstado: string;
  quantidadeCad: number = 0;

  @Output() quantidadeCadastrados = new EventEmitter<number>();

  constructor(private router: Router) {
    this.selectedCategoria = '';
    this.selectedLocal = '';
    this.selectedUnidade = '';
    this.selectedEstado = '';
  }

  cadastrar(): void {
    const produto: Produto = {
      nome: this.nome,
      marca: this.marca,
      quantidade: this.quantidade,
      categoria: this.selectedCategoria,
      local: this.selectedLocal,
      unidade: this.selectedUnidade,
      estado: this.selectedEstado
    };
    let produtosCadastrados: Produto[] = [];
    const produtosCadastradosStr = localStorage.getItem('produtos');
    if (produtosCadastradosStr) {
      produtosCadastrados = JSON.parse(produtosCadastradosStr);
    }

    produtosCadastrados.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtosCadastrados));
    this.router.navigate(['/body']);
    localStorage.setItem('selectedCategoria', this.selectedCategoria);
    localStorage.setItem('selectedLocal', this.selectedLocal);
    localStorage.setItem('selectedUnidade', this.selectedUnidade);
    localStorage.setItem('selectedEstado', this.selectedEstado);

    this.quantidadeCad++;
    alert('Salvo');
  }
}
