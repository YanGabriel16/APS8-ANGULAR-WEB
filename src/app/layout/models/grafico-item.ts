export class GraficoItem {
    nome: string;
    valor: number[];
    cor: string;
    constructor(nome: string, cor: string) {
        this.nome = nome;
        this.valor = [];
        this.cor = cor;
    }
}