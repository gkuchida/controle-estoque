import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent {
  formulario: FormGroup;
  camposTocadosOuModificados:{[key:string]:boolean}={};

  nome: string = '';
  marca: string = '';
  quantidade: number = 0;
  selectedCategoria: string = '';
  selectedLocal: string = '';
  selectedUnidade: string = '';
  selectedEstado: string = '';
  data: Date | null = null;
  quantidadeCad: number = 0;
  formularioInvalido: boolean = true;

  @Output() quantidadeCadastrados = new EventEmitter<number>();

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nome:['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]*$')]],
      marca: [''],
      quantidade: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      selectedCategoria: ['', Validators.required],
      selectedLocal: ['', Validators.required],
      selectedUnidade: ['', this.radioRequiredValidator],
      selectedEstado: [''],
      selectedDate: ['']
    });
    this.formularioInvalido = true;
  }

  get nomeFormControl(): AbstractControl | null{
    return this.formulario?.get('nome');
  }

  radioRequiredValidator(control: FormGroup){
    const value = control.value;
    const isValid = value !== null && value !== undefined && value !== '';
    return isValid ? null : { required: true};
  }

  isCampoInvalido(campo: string) {
    return this.formulario.get(campo)?.invalid;

  }

  marcarCampoTocadoOuModificado(campo: string){
    this.formulario.get(campo)?.markAllAsTouched();
    this.formulario.get(campo)?.markAsDirty();
  }

  adicionarData(event: MatDatepickerInputEvent<Date>){
    this.formulario.get('selectedDate')?.setValue(event.value);
  }

  cadastrar(event: Event): void {
    event.preventDefault();
    if(!this.formulario?.valid){
      return;
    }

    const produto: Produto = {
      nome: this.capitalizeFirstLetter(this.formulario.value.nome),
      marca: this.capitalizeFirstLetter(this.formulario.value.marca),
      quantidade: this.formulario.value.quantidade,
      categoria: this.formulario.value.selectedCategoria,
      local: this.formulario.value.selectedLocal,
      unidade: this.formulario.value.selectedUnidade,
      estado: this.formulario.value.selectedEstado,
      data: this.formulario.value.selectedDate,
    };
    let produtosCadastrados: Produto[] = [];
    const produtosCadastradosStr = localStorage.getItem('produtos');
    if (produtosCadastradosStr) {
      produtosCadastrados = JSON.parse(produtosCadastradosStr);
    }

    produtosCadastrados.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtosCadastrados));
    this.router.navigate(['/body']);
    localStorage.setItem('selectedCategoria', this.formulario.value.selectedCategoria);
    localStorage.setItem('selectedLocal', this.formulario.value.selectedLocal);
    localStorage.setItem('selectedUnidade', this.formulario.value.selectedUnidade);
    localStorage.setItem('selectedEstado', this.formulario.value.selectedEstado);
    localStorage.setItem('validade', this.formulario.value.selectedDate);

    this.data = this.formulario.value.selectedDate;
    this.quantidadeCad++;
    alert('Salvo');
    this.verificarFormulario();
  }

  limparCampos():void{
    this.formulario.reset();
  }

  confirmarNovo(): void{
    if(confirm('Deseja criar um novo cadastro?')){
      this.limparCampos();
    }
  }

  capitalizeFirstLetter(value: string): string{
    if(!value){
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  verificarFormulario(){
    this.formularioInvalido = this.formulario.invalid;
  }
}
