import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { WeatherForecast } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  apiName = 'Default';
  

  createByModel = (model: WeatherForecast) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/weather-forecast',
      body: model,
    },
    { apiName: this.apiName });
  

  deleteById = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/weather-forecast/${id}`,
    },
    { apiName: this.apiName });
  

  getAllByFilter = (filter: WeatherForecast) =>
    this.restService.request<any, WeatherForecast[]>({
      method: 'GET',
      url: '/api/weather-forecast',
      params: { id: filter.id, date: filter.date, temperatureC: filter.temperatureC, summary: filter.summary },
    },
    { apiName: this.apiName });
  

  getById = (id: string) =>
    this.restService.request<any, WeatherForecast>({
      method: 'GET',
      url: `/api/weather-forecast/${id}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
