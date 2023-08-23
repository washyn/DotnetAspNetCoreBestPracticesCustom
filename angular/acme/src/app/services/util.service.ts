import { Injectable } from '@angular/core';
import { NotifyService } from './notify.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(public notify: NotifyService, public message: MessageService) {}
}
