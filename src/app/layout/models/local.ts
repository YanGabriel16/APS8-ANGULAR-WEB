export class Local {
    id: string;
    nome: string;
    cep: string;
    latitude: number;
    longitude: number;
  
    constructor(id: string, nome: string, cep: string) {
      this.id = id;
      this.nome = nome;
      this.cep = cep;
      this.latitude = 49.5689654;
      this.longitude = -23.1557995;
    }
  }