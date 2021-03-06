export function data(): string {
  return 'data';
}

export interface Test {
  title: string;
}

export interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}

export interface DayWeatherData {
  [index: string]: number|Weather[]
  dt: number,
  sunrise: number,
  sunset: number,
  temp: number,
  feels_like: number,
  pressure: number,
  humidity: number,
  dew_point: number,
  uvi: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  wind_deg: number,
  wind_gust: number,
  weather: Weather[]
}

export interface OneCallWeatherData {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: DayWeatherData,

}