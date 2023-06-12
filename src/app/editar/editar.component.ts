import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

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

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder){
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

      const produtosCadastradosStr = localStorage.getItem('produtos');
      if(produtosCadastradosStr){
        const produtos: Produto[] = JSON.parse(produtosCadastradosStr);
        const produto = produtos.find(p => p.nome === this.produtoAtualizar);

        if(produto){
          this.produto = produto;
          this.formulario.setValue({
            nome: produto.nome,
            marca: produto.marca,
            quantidade: produto.quantidade,
            selectedCategoria: produto.categoria,
            selectedLocal: produto.local,
            selectedUnidade: produto.unidade,
            selectedEstado: produto.estado,
            selectedDate: produto.data ? new Date(produto.data) : null
          });
        }
      }
    });
  }

  atualizar(){
    if(this.produto){
      const dadosCadastrados = localStorage.getItem('produtos');
      if(dadosCadastrados){
        this.produtos = JSON.parse(dadosCadastrados);
        const indice = this.produtos.findIndex(p =>
          p.nome.toLowerCase() === this.produto!.nome.toLowerCase());
          if(indice !== -1){
            this.produtos[indice] = {
              ...this.produto,
              nome: this.formulario.value.nome,
              marca: this.formulario.value.marca,
              quantidade: this.formulario.value.quantidade,
              categoria: this.formulario.value.selectedCategoria,
              local: this.formulario.value.selectedLocal,
              unidade: this.formulario.value.selectedUnidade,
              estado: this.formulario.value.selectedEstado,
              data: this.formulario.value.selectedDate
            };
            localStorage.setItem('produtos', JSON.stringify(this.produtos));
            alert('Produto atualizado!');
      }
        }
    }
  }
}
