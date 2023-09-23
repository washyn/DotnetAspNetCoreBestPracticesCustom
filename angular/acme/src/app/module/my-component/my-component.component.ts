import { ApplicationConfigurationDto, ConfigStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from 'src/app/proxy/acme/api-host';
import { WeatherForecastService } from 'src/app/proxy/acme/api-host/controllers';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponentComponent implements OnInit {
  data: WeatherForecast[] = [];

  stateData: Observable<ApplicationConfigurationDto> = this.state.getAll$();

  constructor(private service: WeatherForecastService, public util: UtilService, public state: ConfigStateService) {}
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
    this.service.getAllByFilter({} as WeatherForecast).subscribe((a) => {
      this.data = a;
    });
  }
}
