import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../produto';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {
  produtoAtualizar: string = '';
  produtosCadastrados: Produto[] = [];
  nenhumProdutoEncontrado: boolean = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private router: Router, private http: HttpClient){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.produtoAtualizar = params['nome'];
      this.buscarProdutos();
    });
  }

  buscarProdutos(){
    const url = 'http://localhost:3000/produtos';
    this.http.get<Produto[]>(url).subscribe(produtos => {
      this.produtosCadastrados = produtos.filter(
        produto =>
        produto.nome.toLowerCase().includes(this.produtoAtualizar.toLowerCase())
      );
      this.nenhumProdutoEncontrado = this.produtosCadastrados.length === 0;
    });
  }
}
