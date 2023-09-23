import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbpCustomModule } from './abp-custom.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MessageComponent } from './components/message/message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotifyComponent } from './components/notify/notify.component';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialSamplesModule } from './module/angular-material-sample.module';

@NgModule({
  declarations: [NotifyComponent, MessageComponent, AppComponent],
  imports: [
    BrowserModule,
    AbpCustomModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    AngularMaterialSamplesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
