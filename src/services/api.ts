import axios from 'axios';
import { API_CONFIG } from './config';

// Create an axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

// Interface for current weather response
export interface CurrentWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Interface for forecast response
export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
  };
}

// Fetch current weather by city name
export const getCurrentWeather = async (city: string): Promise<CurrentWeatherResponse> => {
  try {
    const response = await apiClient.get<CurrentWeatherResponse>('/weather', {
      params: {
        q: city,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.UNITS, // Use metric units (Celsius)
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Fetch 5-day forecast by city name
export const getForecast = async (city: string): Promise<ForecastResponse> => {
  try {
    const response = await apiClient.get<ForecastResponse>('/forecast', {
      params: {
        q: city,
        appid: API_CONFIG.API_KEY,
        units: API_CONFIG.UNITS, // Use metric units (Celsius)
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};