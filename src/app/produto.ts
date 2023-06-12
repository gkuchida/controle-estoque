export class Produto {
  local: string;
  nome: string;
  marca: string;
  quantidade: number;
  categoria: string;
  unidade: string;
  estado: string;
  data: Date;

  constructor(local: string, nome: string, marca: string, quantidade: number, categoria: string, unidade: string, estado: string, data: Date) {
    this.local = local;
    this.nome = nome;
    this.marca = marca;
    this.quantidade = quantidade;
    this.categoria = categoria;
    this.unidade = unidade;
    this.estado = estado;
    this.data = data;
  }
}
