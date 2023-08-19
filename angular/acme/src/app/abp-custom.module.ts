import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@abp/ng.core';
import { environment } from 'src/environments/environment';
import { registerLocale } from '@abp/ng.core/locale';

@NgModule({
  imports:[ CommonModule, CoreModule.forRoot({
    environment: environment,
    registerLocaleFn: registerLocale()
  })]
})
export class AbpCustomModule { 
  static forRoot(): ModuleWithProviders<AbpCustomModule> {
    return {
      ngModule: AbpCustomModule,
      providers:[]
    }
  }
}
