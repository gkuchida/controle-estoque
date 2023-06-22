import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../produto';
import { format } from 'date-fns';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit{
  produto: any;
  dataUltimaAtualizacao: Date;

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
    {value: 'option11', name: 'Fechada'},
    {value: 'option12', name: 'Limpeza'}
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog){
      this.dataUltimaAtualizacao = new Date();
    }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        const produtoNome = params['nome'];
        this.http.get<any>('http://localhost:3000/produtos?nome=' + produtoNome)
        .subscribe(response => {
          if(response.length > 0){
            this.produto = response[0];
            this.dataUltimaAtualizacao = new Date(this.produto.dataUltimaAtualizacao);
          }
        });
      });
  }

  getCategoriaNome(categoria:string): string{
    const categoriaEncontrada = this.itemNomes.find(item => item.value === categoria);
    return categoriaEncontrada ? categoriaEncontrada.name : '';
  }

  getLocalNome(local: string): string{
    const localEcontrado = this.itemNomes.find(item => item.value === local);
    return localEcontrado ? localEcontrado.name : '';
  }

  getEstadoNome(estado: string): string{
    const estadoEncontrado = this.itemNomes.find(item => item.value === estado);
    return estadoEncontrado ? estadoEncontrado.name : '';
  }

  formatDate(date: string): string{
    if(date){
      const parts = date.split('/');
      const day = parts[1];
      const month = parts[0];
      const year = parts[2];
      return`${day}/${month}/${year}`;
    }
    return '';
  }

  openConfirmationDialog(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {mensagem: 'Deseja realmente excluir o produto?'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.excluirProduto();
      }
    });
  }

  excluirProduto():void{
    if(this.produto && this.produto.id){
      const url = `http://localhost:3000/produtos/${this.produto.id}`;
      this.http.delete(url).subscribe(response => {
        alert('Excluído!');
        window.history.back();
      }, error => {
        alert('Erro ao tentar excluir.');
      });
    }
  }
}
