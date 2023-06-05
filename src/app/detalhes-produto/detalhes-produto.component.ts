import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../produto';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit{
  selectedCategoria: string;
  selectedLocal: string;
  selectedUnidade: string;
  selectedEstado: string;

  produtoDetalhado: Produto | undefined;
  produtosCadastrados: Produto[] = [];
  itemNomes = [
    {value: 'option1', name: 'Carnes'},
    {value: 'option2', name: 'Bebidas'},
    {value: 'option3', name: 'Frutas'},
    {value: 'option4', name: 'Verduras'},
    {value: 'option5', name: 'Mercearia'},
    {value: 'option6', name: 'Armário'},
    {value: 'option7', name: 'Freezer'},
    {value: 'option8', name: 'Fruteira'},
    {value: 'option9', name: 'Geladeira'},
    {value: 'option10', name: 'Aberta'},
    {value: 'option11', name: 'Fechada'}
  ];

  constructor(private route: ActivatedRoute){
    this.selectedCategoria = '';
    this.selectedLocal = '';
    this.selectedUnidade = '';
    this.selectedEstado = '';
  }

  ngOnInit(): void {
    const produtos = localStorage.getItem('produtos');
    if(produtos){
      this.produtosCadastrados = JSON.parse(produtos);
      this.route.params.subscribe(params => {
        const nome = params['nome'];
        this.produtoDetalhado = this.produtosCadastrados.find(produto => produto.nome === nome);

        const storedCategoria = localStorage.getItem('selectedCategoria');
        const selectedCategoriaObj = this.itemNomes.find(item => item.value === storedCategoria);
        this.selectedCategoria = selectedCategoriaObj ? selectedCategoriaObj.name : '';

        const storedLocal = localStorage.getItem('selectedLocal');
        const selectedLocalObj = this.itemNomes.find(item => item.value === storedLocal);
        this.selectedLocal = selectedLocalObj ? selectedLocalObj.name : '';

        const storedUnidade = localStorage.getItem('selectedUnidade');
        this.selectedUnidade = storedUnidade ?? '';

        const storedEstado = localStorage.getItem('selectedEstado');
        const selectedEstadoObj = this.itemNomes.find(item => item.value === storedEstado);
        this.selectedEstado = selectedEstadoObj ? selectedEstadoObj.name : '';
      });
    }
  }
}
