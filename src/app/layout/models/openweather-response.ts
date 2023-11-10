import { City, ListItem } from "./openweather-objects";

export class OpenWeatherResponse {
    cod: string;
    message: number;
    cnt: number;
    list?: ListItem[];
    city?: City;
}