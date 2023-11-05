import { HealthRecommendations, Index, Pollutant } from "./airquality-objects";

export class AirQualityResponse {
    dateTime: Date;
    regionCode: string ;
    indexes: Index[];
    pollutants: Pollutant[];
    healthRecommendations: HealthRecommendations;
  }