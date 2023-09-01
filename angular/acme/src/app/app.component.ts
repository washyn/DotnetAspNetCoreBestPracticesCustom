import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from './proxy/acme/api-host/controllers';
import { WeatherForecast } from './proxy/acme/api-host';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'acme';
  data: WeatherForecast[] = [];
  constructor(private service: WeatherForecastService, public util: UtilService) {}

  showMessage() {
    this.util.notify.info('Message', 'Hello worl');
  }

  openDialog() {
    this.util.message.confirm(
      'hello',
      'Develop',
      (isConfirmed) => {
        if (isConfirmed) {
          this.util.notify.info('confirmado');
        }
      },
      {
        confirmText: 'Si confirmo',
        cancelText: 'No, cancelar',
      }
    );
  }

  ngOnInit(): void {
    this.service.get().subscribe((a) => {
      this.data = a;
    });
  }
}
