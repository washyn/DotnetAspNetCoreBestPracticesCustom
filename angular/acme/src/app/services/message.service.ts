import { Injectable } from '@angular/core';
import { MessageComponent } from '../components/message/message.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { resolve } from '@angular/compiler-cli';

export type TypeMessage = 'info' | 'success' | 'warn' | 'error' | 'confirm';
export interface MessageData {
  message: string;
  title?: string;
  type: TypeMessage;
  options?: any;
}
// namespace message {
//   //TODO: these methods return jQuery.Promise instead of any. fix it.
//   function info(message: string, title?: string, options?: any): any;
//   function success(message: string, title?: string, options?: any): any;
//   function warn(message: string, title?: string, options?: any): any;
//   function error(message: string, title?: string, options?: any): any;
//   function confirm(message: string, title?: string, callback?: (isConfirmed: boolean, isCancelled?: boolean) => void, options?: any): any;
// }

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private _matDialog: MatDialog) {}

  info(message: string, title?: string, options?: any): any {
    this.showMessage('info', message, title, undefined, options);
  }
  success(message: string, title?: string, options?: any): any {
    this.showMessage('success', message, title, undefined, options);
  }
  warn(message: string, title?: string, options?: any): any {
    this.showMessage('warn', message, title, undefined, options);
  }
  error(message: string, title?: string, options?: any): any {
    this.showMessage('error', message, title, undefined, options);
  }
  confirm(
    message: string,
    title?: string,
    callback?: (isConfirmed: boolean, isCancelled?: boolean) => void,
    options?: any
  ): any {
    this.showMessage('confirm', message, title, callback, options);
  }

  private showMessage(
    type: TypeMessage,
    message: string,
    title?: string,
    callback?: (isConfirmed: boolean, isCancelled?: boolean) => void,
    options?: any
  ) {
    let data = {
      role: 'alertdialog',
      data: {
        message,
        title,
        type,
        options: {
          ...options,
        },
      } as MessageData,
      width: '350px',
      autoFocus: 'dialog',
      disableClose: false,
      ...options,
    } as MatDialogConfig<MessageData>;

    if (type === 'confirm') {
      const dialog = this._matDialog.open<MessageComponent, MessageData, boolean>(MessageComponent, data);
      dialog.afterClosed().subscribe((result) => {
        if (result) {
          callback && callback(result);
        }
      });
    } else {
      const dialog = this._matDialog.open<MessageComponent, MessageData, any>(MessageComponent, data);
      dialog.afterClosed().subscribe((result) => {});
    }
  }
}
