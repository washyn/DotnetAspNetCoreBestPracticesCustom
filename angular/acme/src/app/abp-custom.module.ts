import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule, noop } from '@abp/ng.core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
import { ErrorHandler, HTTP_ERROR_CONFIG, RootParams, httpErrorConfigFactory } from './error-handler';

@NgModule({
  imports: [
    CommonModule,
    CoreModule.forRoot({
      environment: environment,
      registerLocaleFn: registerLocale(),
    }),
  ],
})
export class AbpCustomModule {
  static forRoot({ httpErrorConfig } = {} as RootParams): ModuleWithProviders<AbpCustomModule> {
    return {
      ngModule: AbpCustomModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [ErrorHandler],
          useFactory: noop,
        },
        { provide: HTTP_ERROR_CONFIG, useValue: httpErrorConfig },
        {
          provide: 'HTTP_ERROR_CONFIG',
          useFactory: httpErrorConfigFactory,
          deps: [HTTP_ERROR_CONFIG],
        },
      ],
    };
  }
}
