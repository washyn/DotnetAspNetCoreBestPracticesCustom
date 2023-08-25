import { Component, ComponentRef, Injectable, InjectionToken } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Injector, Type } from '@angular/core';
import { EMPTY, Observable, catchError, filter, of, switchMap, throwError } from 'rxjs';
import { NavigationError } from '@angular/router';
import { HttpErrorReporterService, LocalizationParam } from '@abp/ng.core';

export interface RootParams {
  httpErrorConfig?: HttpErrorConfig;
}

export type ErrorScreenErrorCodes = 401 | 403 | 404 | 500;

export interface HttpErrorConfig {
  skipHandledErrorCodes?: ErrorScreenErrorCodes[] | number[];
  errorScreen?: {
    component: Type<any>;
    forWhichErrors?: ErrorScreenErrorCodes[];
    hideCloseIcon?: boolean;
  };
}

export type HttpErrorHandler = (injector: Injector, httpError: HttpErrorResponse) => Observable<any>;

export type LocaleDirection = 'ltr' | 'rtl';

export function httpErrorConfigFactory(config = {} as HttpErrorConfig) {
  if (config.errorScreen && config.errorScreen.component && !config.errorScreen.forWhichErrors) {
    config.errorScreen.forWhichErrors = [401, 403, 404, 500];
  }

  return {
    skipHandledErrorCodes: [],
    errorScreen: {},
    ...config,
  } as HttpErrorConfig;
}

export const HTTP_ERROR_CONFIG = new InjectionToken<HttpErrorConfig>('HTTP_ERROR_CONFIG');

export const HTTP_ERROR_HANDLER = new InjectionToken<HttpErrorHandler>('HTTP_ERROR_HANDLER');

export const DEFAULT_ERROR_MESSAGES = {
  defaultError: {
    title: 'An error has occurred!',
    details: 'Error detail not sent by server.',
  },
  defaultError401: {
    title: 'You are not authenticated!',
    details: 'You should be authenticated (sign in) in order to perform this operation.',
  },
  defaultError403: {
    title: 'You are not authorized!',
    details: 'You are not allowed to perform this operation.',
  },
  defaultError404: {
    title: 'Resource not found!',
    details: 'The resource requested could not found on the server.',
  },
  defaultError500: {
    title: 'Internal server error',
    details: 'Error detail not sent by server.',
  },
};

export const DEFAULT_ERROR_LOCALIZATIONS = {
  defaultError: {
    title: 'AbpUi::DefaultErrorMessage',
    details: 'AbpUi::DefaultErrorMessageDetail',
  },
  defaultError401: {
    title: 'AbpUi::DefaultErrorMessage401',
    details: 'AbpUi::DefaultErrorMessage401Detail',
  },
  defaultError403: {
    title: 'AbpUi::DefaultErrorMessage403',
    details: 'AbpUi::DefaultErrorMessage403Detail',
  },
  defaultError404: {
    title: 'AbpUi::DefaultErrorMessage404',
    details: 'AbpUi::DefaultErrorMessage404Detail',
  },
  defaultError500: {
    title: 'AbpUi::500Message',
    details: 'AbpUi::DefaultErrorMessage',
  },
};

@Injectable({ providedIn: 'root' })
export class ErrorHandler {
  componentRef: ComponentRef<HttpErrorWrapperComponent> | null = null;

  protected httpErrorHandler = this.injector.get(HTTP_ERROR_HANDLER, (_, err: HttpErrorResponse) => throwError(err));
  protected httpErrorReporter: HttpErrorReporterService;
  protected httpErrorConfig: HttpErrorConfig;

  constructor(protected injector: Injector) {
    this.httpErrorReporter = injector.get(HttpErrorReporterService);
    this.httpErrorConfig = injector.get('HTTP_ERROR_CONFIG');
    this.listenToRestError();
  }

  protected listenToRestError() {
    this.httpErrorReporter.reporter$
      .pipe(filter(this.filterRestErrors), switchMap(this.executeErrorHandler))
      .subscribe();
  }

  private executeErrorHandler = (error: any) => {
    const errHandler = this.httpErrorHandler(this.injector, error);
    const isObservable = errHandler instanceof Observable;
    const response = isObservable ? errHandler : of(null);

    return response.pipe(
      catchError((err) => {
        this.handleError(err);
        return of(null);
      })
    );
  };

  private handleError(err: any) {
    if (err instanceof HttpErrorResponse && err.url?.includes('openid-configuration')) {
      console.log('se omite el trato del error');
      return;
    } else {
      console.log('continuar con el trato del error');
    }

    const body = err?.error?.error || {
      key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
      defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
    };

    if (err instanceof HttpErrorResponse && err.headers.get('_AbpErrorFormat')) {
      const confirmation$ = this.showErrorWithRequestBody(body);

      if (err.status === 401) {
        confirmation$.subscribe(() => {
          this.navigateToLogin();
        });
      }
    } else {
      switch (err.status) {
        case 401:
          this.canCreateCustomError(401)
            ? this.show401Page()
            : this.showError(
                {
                  key: DEFAULT_ERROR_LOCALIZATIONS.defaultError401.title,
                  defaultValue: DEFAULT_ERROR_MESSAGES.defaultError401.title,
                },
                {
                  key: DEFAULT_ERROR_LOCALIZATIONS.defaultError401.details,
                  defaultValue: DEFAULT_ERROR_MESSAGES.defaultError401.details,
                }
              ).subscribe(() => this.navigateToLogin());
          break;
        case 403:
          this.createErrorComponent({
            title: {
              key: DEFAULT_ERROR_LOCALIZATIONS.defaultError403.title,
              defaultValue: DEFAULT_ERROR_MESSAGES.defaultError403.title,
            },
            details: {
              key: DEFAULT_ERROR_LOCALIZATIONS.defaultError403.details,
              defaultValue: DEFAULT_ERROR_MESSAGES.defaultError403.details,
            },
            status: 403,
          });
          break;
        case 404:
          this.canCreateCustomError(404)
            ? this.show404Page()
            : this.showError(
                {
                  key: DEFAULT_ERROR_LOCALIZATIONS.defaultError404.details,
                  defaultValue: DEFAULT_ERROR_MESSAGES.defaultError404.details,
                },
                {
                  key: DEFAULT_ERROR_LOCALIZATIONS.defaultError404.title,
                  defaultValue: DEFAULT_ERROR_MESSAGES.defaultError404.title,
                }
              );
          break;
        case 500:
          this.createErrorComponent({
            title: {
              key: DEFAULT_ERROR_LOCALIZATIONS.defaultError500.title,
              defaultValue: DEFAULT_ERROR_MESSAGES.defaultError500.title,
            },
            details: {
              key: DEFAULT_ERROR_LOCALIZATIONS.defaultError500.details,
              defaultValue: DEFAULT_ERROR_MESSAGES.defaultError500.details,
            },
            status: 500,
          });
          break;
        case 0:
          if (err.statusText === 'Unknown Error') {
            this.createErrorComponent({
              title: {
                key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
                defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
              },
              details: err.message,
              isHomeShow: false,
            });
          }
          break;
        default:
          this.showError(
            {
              key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.details,
              defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.details,
            },
            {
              key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
              defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
            }
          );
          break;
      }
    }
  }

  protected show401Page() {
    this.createErrorComponent({
      title: {
        key: DEFAULT_ERROR_LOCALIZATIONS.defaultError401.title,
        defaultValue: DEFAULT_ERROR_MESSAGES.defaultError401.title,
      },
      status: 401,
    });
  }

  protected show404Page() {
    this.createErrorComponent({
      title: {
        key: DEFAULT_ERROR_LOCALIZATIONS.defaultError404.title,
        defaultValue: DEFAULT_ERROR_MESSAGES.defaultError404.title,
      },
      status: 404,
    });
  }

  protected showErrorWithRequestBody(body: any) {
    let message: LocalizationParam;
    let title: LocalizationParam;

    if (body.details) {
      message = body.details;
      title = body.message;
    } else if (body.message) {
      title = {
        key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
        defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
      };
      message = body.message;
    } else {
      message = body.message || {
        key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
        defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
      };
      title = '';
    }

    return this.showError(message, title);
  }

  protected showError(message: LocalizationParam, title: LocalizationParam): Observable<any> {
    console.log('Show error');
    return EMPTY;
  }

  private navigateToLogin() {}

  createErrorComponent(instance: Partial<HttpErrorWrapperComponent>) {
    console.log('error component');
  }

  canCreateCustomError(status: ErrorScreenErrorCodes): boolean {
    return !!(
      this.httpErrorConfig?.errorScreen?.component &&
      this.httpErrorConfig?.errorScreen?.forWhichErrors &&
      this.httpErrorConfig?.errorScreen?.forWhichErrors.indexOf(status) > -1
    );
  }

  protected filterRestErrors = ({ status }: HttpErrorResponse): boolean => {
    if (typeof status !== 'number') return false;

    return (
      !!this.httpErrorConfig.skipHandledErrorCodes &&
      this.httpErrorConfig.skipHandledErrorCodes.findIndex((code) => code === status) < 0
    );
  };

  protected filterRouteErrors = (navigationError: NavigationError): boolean => {
    return (
      navigationError.error?.message?.indexOf('Cannot match') > -1 &&
      !!this.httpErrorConfig.skipHandledErrorCodes &&
      this.httpErrorConfig.skipHandledErrorCodes.findIndex((code) => code === 404) < 0
    );
  };
}

@Component({
  selector: 'abp-http-error-wrapper',
  template: '',
  styles: [],
})
export class HttpErrorWrapperComponent {}
