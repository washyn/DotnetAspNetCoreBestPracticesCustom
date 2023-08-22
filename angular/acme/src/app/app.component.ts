import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from './proxy/acme/api-host/controllers';
import { WeatherForecast } from './proxy/acme/api-host';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'acme';
  data:WeatherForecast[] = []
  constructor(private service: WeatherForecastService) {
  }
  ngOnInit(): void {
    this.service.get().subscribe(a => {
      this.data = a
    })
  }
}
