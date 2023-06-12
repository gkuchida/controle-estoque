import { Produto } from './../produto';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit{
  nomeProduto: string = '';
  produtosCadastrados: Produto[] = [];
  nenhumProdutoEncontrado: boolean = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nomeProduto = params['nome'];

      const dadosCadastrados = localStorage.getItem('produtos');
      if(dadosCadastrados){
        const produtos: Produto[] = JSON.parse(dadosCadastrados);
        // this.produtosCadastrados = produtos;
        this.produtosCadastrados = produtos.filter(produto =>
          // produto.nome.includes(this.nomeProduto));
          produto.nome.toLowerCase().includes(this.nomeProduto.toLowerCase()));
      }
      this.nenhumProdutoEncontrado = this.produtosCadastrados.length === 0;
    });
  }

  openConfirmationDialog(produto: Produto): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: produto,
      // data: {
      //   message: 'Tem certeza que deseja excluir o produto?',
      //   confirmText: 'Excluir',
      //   cancelText: 'Cancelar'
      // }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.excluirProduto(produto);
      }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   if( result == 'confirm'){
    //     const index = this.produtosCadastrados.indexOf(produto);
    //     if(index !== -1){
    //       this.produtosCadastrados.splice(index, 1);
    //       localStorage.setItem('produtos', JSON.stringify(this.produtosCadastrados));
    //     }
    //   }
    // })
  }
  excluirProduto(produto: Produto){
    const index = this.produtosCadastrados.indexOf(produto);
    if(index !== -1){
      this.produtosCadastrados.splice(index, 1);
      localStorage.setItem('produtos', JSON.stringify(this.produtosCadastrados));
    }
  }
}
