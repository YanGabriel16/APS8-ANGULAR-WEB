import { OpenWeatherResponse } from ".";
import { AirQualityResponse } from "./airquality-response";

export class Local {
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
  qualidadeAr: AirQualityResponse;
  clima: OpenWeatherResponse;
}