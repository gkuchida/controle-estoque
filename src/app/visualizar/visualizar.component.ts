import { Produto } from './../produto';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})

export class VisualizarComponent implements OnInit {
  quantidadeCad: number = 0;
  produtosCadastrados: Produto[] = [];
  nome?: string;
  produtoSelecionado?: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const produtosCadastradosStr = localStorage.getItem('produtos');
    if (produtosCadastradosStr) {
      this.produtosCadastrados = JSON.parse(produtosCadastradosStr);
      this.quantidadeCad = this.produtosCadastrados.length;
      this.produtosCadastrados.sort((a,b) => a.nome.localeCompare(b.nome));
    }
  }

  onClickItem(produto: Produto): void {
    this.router.navigate(['/detalhes', produto.nome]);
  }
}
