import { Component } from '@angular/core';
import { WeatherForecastService } from './proxy/acme/api-host/controllers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acme';
  constructor(service: WeatherForecastService) {
    service.get().subscribe(a => {
      // remote data
      console.log("a");
      console.log(a);
    })
  }
}
