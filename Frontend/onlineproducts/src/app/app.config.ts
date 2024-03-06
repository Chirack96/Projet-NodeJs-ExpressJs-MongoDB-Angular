import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { appRoutes } from './app.routes';

registerLocaleData(en);



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideNzI18n(en_US), importProvidersFrom(FormsModule), importProvidersFrom(HttpClientModule), provideAnimations()]
};