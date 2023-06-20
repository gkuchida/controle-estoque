import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  produtoAtualizar: string = '';

  selectedCategoria!: string;
  selectedLocal!: string;
  selectedUnidade!: string;
  selectedEstado!: string;
  selectedDate!: Date | null;
  formulario: FormGroup;
  produtoAtualizado: boolean = false;

  produto: Produto | undefined;
  produtos: Produto[] = [];

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
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog){
    this.formulario = this.formBuilder.group({
      nome:[''],
      marca: [''],
      quantidade: [''],
      selectedCategoria: [''],
      selectedLocal: [''],
      selectedUnidade: [''],
      selectedEstado: [''],
      selectedDate: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.produtoAtualizar = params['nome'];

      const url = `http://localhost:3000/produtos?nome=${this.produtoAtualizar}`;
      this.http.get<Produto[]>(url).subscribe(produtos => {
        if(produtos.length > 0){
          this.produto = produtos[0];

          this.formulario.setValue({
            nome: this.produto?.nome,
            marca: this.produto?.marca,
            quantidade: this.produto?.quantidade,
            selectedCategoria: this.produto?.categoria,
            selectedLocal: this.produto?.local,
            selectedUnidade: this.produto?.unidade,
            selectedEstado: this.produto?.estado,
            selectedDate: this.produto?.data ? new Date(this.produto.data) : null
          });
        }
      }, error => {
        alert('Erro');
      });
    });
  }

  atualizar(){
    if(this.produto){
      const url = `http://localhost:3000/produtos/${this.produto.id}`;
      const produtoAtualizado = {
        ...this.produto,
        nome: this.formulario.value.nome,
        marca: this.formulario.value.marca,
        quantidade: this.formulario.value.quantidade,
        categoria: this.formulario.value.selectedCategoria,
        local: this.formulario.value.selectedLocal,
        unidade: this.formulario.value.selectedUnidade,
        estado: this.formulario.value.selectedEstado,
        data: this.formulario.value.selectedDate ? new Date(this.formulario.value.selectedDate) : null
      };

      const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
        width: '250px',
        data: {message: 'Deseja salvar alterações?'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result === true){
          this.http.put(url, produtoAtualizado).subscribe(response => {
            this.produtoAtualizado = true;
            // alert('Produto atualizado!');
          }, error => {
            alert('Não foi possível atualizar')
          });
        }
      });
    }
  }
}
