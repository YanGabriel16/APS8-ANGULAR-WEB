export class Color {
    red?: number;
    green?: number;
    blue?: number;
  }
  
  export class Index {
    code: string;
    displayName: string;
    aqi: number;
    aqiDisplay: string;
    color: Color;
    category: string;
    dominantPollutant: string;
  }
  
  export class Concentration {
    value: number;
    units: string;
  }
  
  export class AdditionalInfo {
    sources: string;
    effects: string;
  }
  
  export class Pollutant {
    code: string;
    displayName: string;
    fullName: string;
    concentration: Concentration;
    additionalInfo: AdditionalInfo;
  }
  
  export class HealthRecommendations {
    generalPopulation: string;
    elderly: string;
    lungDiseasePopulation: string;
    heartDiseasePopulation: string;
    athletes: string;
    pregnantWomen: string;
    children: string;
  }