import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { WeatherForecast } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  apiName = 'Default';
  

  get = () =>
    this.restService.request<any, WeatherForecast[]>({
      method: 'GET',
      url: '/weather-forecast',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
