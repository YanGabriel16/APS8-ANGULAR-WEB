export class Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export class Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export class Clouds {
    all: number;
}

export class Wind {
    speed: number;
    deg: number;
    gust: number;
}

export class Sys {
    pod: string;
}

export class ListItem {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
}

export class City {
    Id: number;
    Name: string;
    Coord: Coord;
    Country: string;
    Population: number;
    Timezone: number;
    Sunrise: number;
    Sunset: number;
}

export class Coord {
    Lat: number;
    Lon: number;
}