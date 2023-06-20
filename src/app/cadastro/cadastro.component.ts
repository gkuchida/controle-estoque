import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { tr } from 'date-fns/locale';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formulario: FormGroup;
  camposTocadosOuModificados: { [key: string]: boolean } = {};

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
  idProdutoSalvo: number | null = null;
  produtoSalvo: boolean = false;

  @Output() quantidadeCadastrados = new EventEmitter<number>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ ]*$')]],
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

  ngOnInit(): void {
    this.quantidadeCad = this.getQuantidadeCadastrados();
  }

  get nomeFormControl(): AbstractControl | null {
    return this.formulario?.get('nome');
  }

  radioRequiredValidator(control: FormGroup) {
    const value = control.value;
    const isValid = value !== null && value !== undefined && value !== '';
    return isValid ? null : { required: true };
  }

  isCampoInvalido(campo: string) {
    return this.formulario.get(campo)?.invalid;
  }

  marcarCampoTocadoOuModificado(campo: string) {
    this.formulario.get(campo)?.markAllAsTouched();
    this.formulario.get(campo)?.markAsDirty();
  }

  adicionarData(event: MatDatepickerInputEvent<Date>) {
    this.formulario.get('selectedDate')?.setValue(event.value);
  }

  cadastrar(event: Event): void {
    event.preventDefault();
    if (!this.formulario?.valid) {
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

    this.http.post('http://localhost:3000/produtos', produto).subscribe((response: any) => {
      this.limparCampos();
      this.quantidadeCad++;
      this.verificarFormulario();
      this.router.navigate(['/body']);
      this.idProdutoSalvo = response.id;
      this.produtoSalvo = true;
      // alert('Salvo');
    });

    this.salvarProduto(produto)
    .then((response: any) => {
      if(response && response.id){
        this.idProdutoSalvo = response.id;
      }else{
        console.error('Resposta inválida da API:', response);
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }

  salvarProduto(produto: any):Promise<any>{
    const url = 'http://localhost/3000/produtos';
    return this.http.post(url,produto).toPromise();
  }

  limparCampos(): void {
    this.formulario.reset();
  }

  confirmarNovo(): void {
    if (confirm('Deseja criar um novo cadastro?')) {
      this.limparCampos();
    }
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  verificarFormulario() {
    this.formularioInvalido = this.formulario.invalid;
  }

  getQuantidadeCadastrados(): number {
    const produtosCadastradosStr = localStorage.getItem('produtos');
    if (produtosCadastradosStr) {
      const produtosCadastrados: Produto[] = JSON.parse(produtosCadastradosStr);
      return produtosCadastrados.length;
    }
    return 0;
  }
}
