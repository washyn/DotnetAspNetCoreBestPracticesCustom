import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifyComponent } from '../components/notify/notify.component';

export type TypeNotify = 'info' | 'success' | 'warn' | 'error';
export interface NotifyData {
  message: string;
  title?: string;
}

// namespace notify {
//   function info(message: string, title?: string, options?: any): void;
//   function success(message: string, title?: string, options?: any): void;
//   function warn(message: string, title?: string, options?: any): void;
//   function error(message: string, title?: string, options?: any): void;
// }
//

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private _snackBar: MatSnackBar) {}
  info(message: string, title?: string, options?: any): void {
    this.showNotity('info', message, title, options);
  }
  success(message: string, title?: string, options?: any): void {
    this.showNotity('success', message, title, options);
  }
  warn(message: string, title?: string, options?: any): void {
    this.showNotity('warn', message, title, options);
  }
  error(message: string, title?: string, options?: any): void {
    this.showNotity('error', message, title, options);
  }

  private showNotity(typeNotify: TypeNotify, message: string, title?: string, options?: any) {
    this._snackBar.openFromComponent<NotifyComponent, NotifyData>(NotifyComponent, {
      duration: 1000 * 3,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: {
        title: title,
        message: message,
      },
      ...options,
    });
  }
}
