import { OpenWeatherResponse } from ".";

export class Local {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  cep?: number;
  cidade?: string;
  estado?: string;
  pais?: string;
  dados: LocalDadosObject[];
}

export class LocalDadosObject {
  clima: OpenWeatherResponse;
  data: Date;
}