# Acme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


---

## Pasos para integrar la generacion de abp.

- Install Packages:

    "@abp/ng.core": "^7.2.3", add as dependency
    "@abp/ng.schematics": "^7.2.3", add as proyect dev
- Add  "skipLibCheck": true  in tsconfig.json
- Add envireoment files.
```ts
import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'BookStore',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44327/',
    redirectUri: baseUrl,
    clientId: 'BookStore_App',
    responseType: 'code',
    scope: 'offline_access BookStore',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44327',
      rootNamespace: 'Acme.BookStore',
    },
  },
} as Environment;

```

- Add custom abp module.
```ts
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  // AuthService,
  BaseCoreModule,
  CoreModule,
  RootCoreModule,
} from '@abp/ng.core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';
// import { AuthCustomService } from '../auth-custom.service';

// hay una version de abp core, ver si se puede usar...
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule.forRoot({
      environment: environment,
      registerLocaleFn: registerLocale(),
    }),
    // BaseCoreModule,
    // RootCoreModule
  ],
})
export class AbpCustomModule {
  static forRoot(): ModuleWithProviders<AbpCustomModule> {
    return {
      ngModule: AbpCustomModule,
      providers: [
        // {
        //   provide: AuthService,
        //   useClass: AuthCustomService,
        // },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useExisting: ApiInterceptor,
        //   multi: true,
        // },
        // {
        //   provide: ApiInterceptor,
        //   useClass: JwtBearerApiInterceptor,
        // },
      ],
    };
  }
}

```

- Add refence in module.
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AbpCustomModule } from './abp-custom/abp-custom.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AbpCustomModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

```
- Finally generate proxy via command

abp generate-proxy -t ng
or
npx ng g @abp/ng.schematics:proxy-add

