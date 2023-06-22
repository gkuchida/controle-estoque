import { Produto } from './../produto';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit{
  nomeProduto: string = '';
  produtosCadastrados: Produto[] = [];
  nenhumProdutoEncontrado: boolean = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private http: HttpClient){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nomeProduto = params['nome'];
      this.buscarProdutos();
    });
  }

  buscarProdutos(){
    const url = 'http://localhost:3000/produtos';
    this.http.get<Produto[]>(url).subscribe(produtos => {
      this.produtosCadastrados = produtos.filter(
        produto =>
        produto.nome.toLowerCase().includes(this.nomeProduto.toLowerCase())
      );
      this.nenhumProdutoEncontrado = this.produtosCadastrados.length === 0;
    });
  }

  openConfirmationDialog(produto: Produto): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: produto,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.excluirProduto(produto);
      }
    });
  }

  excluirProduto(produto: Produto){
    const index = this.produtosCadastrados.indexOf(produto);
    if(index !== -1){
      this.produtosCadastrados.splice(index, 1);
      this.http.delete(`http://localhost:3000/produtos/${produto.id}`).subscribe(() => {
        alert('Excluído!');
      }, (error) => {
        alert('Não foi possível excluir: ');
      });
    }
  }
}
