import { Produto } from './../produto';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
      this.getProdutosCadastrados();
  }

  getProdutosCadastrados(): void{
    this.http.get<Produto[]>('http://localhost:3000/produtos').subscribe(produtos => {
      this.produtosCadastrados = produtos.sort((a,b) => a.nome.localeCompare(b.nome));
      this.quantidadeCad = produtos.length;
    });
  }
  
  onClickItem(produto: Produto): void {
    this.router.navigate(['/detalhes', produto.nome]);
  }
}
