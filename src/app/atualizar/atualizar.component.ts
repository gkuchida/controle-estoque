import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../produto';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {
  produtoAtualizar: string = '';
  produtosCadastrados: Produto[] = [];
  nenhumProdutoEncontrado: boolean = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private router: Router){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produtoAtualizar = params['nome'];

      const dadosCadastrados = localStorage.getItem('produtos');
      if(dadosCadastrados){
        const produtos: Produto[] = JSON.parse(dadosCadastrados);
        this.produtosCadastrados = produtos.filter(produto =>
          produto.nome.toLowerCase().includes(this.produtoAtualizar.toLowerCase()));
      }
      this.nenhumProdutoEncontrado = this.produtosCadastrados.length === 0;
    });
  }
}
