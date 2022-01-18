export function data(): string {
  return 'data';
}

interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}

interface Temp {
  day: number,
  min: number,
  max: number,
  night: number,
  eve: number,
  morn: number
}

interface FeelsLike {
  day: number,
  night: number,
  eve: number,
  morn: number
}

export interface DayWeatherData {
  [index: string]: number|Temp|FeelsLike|undefined|Weather[]
  dt: number,
  sunrise: number,
  sunset: number,
  moonrise?: number,
  moonset?: number,
  temp: number|Temp,
  feels_like: number|FeelsLike,
  pressure: number,
  humidity: number,
  dew_point: number,
  uvi: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  wind_deg: number,
  wind_gust: number,
  weather: Weather[],
  pop?: number
}

export interface OneCallWeatherData {
  lat: number,
  lon: number,
  timezone: string,
  timezone_offset: number,
  current: DayWeatherData,
  hourly: DayWeatherData[],
  daily: DayWeatherData[],
  minutely: DayWeatherData[]
}