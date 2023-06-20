export class Produto {
  id?: number;
  local: string;
  nome: string;
  marca: string;
  quantidade: number;
  categoria: string;
  unidade: string;
  estado: string;
  data: Date;

  constructor( id: number, local: string, nome: string, marca: string, quantidade: number, categoria: string, unidade: string, estado: string, data: Date) {
    this.id = id;
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
