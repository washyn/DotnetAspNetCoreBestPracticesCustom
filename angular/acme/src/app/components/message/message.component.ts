import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MessageData } from "../../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  icon = "info"

  constructor(@Inject(MAT_DIALOG_DATA) public data: MessageData) {
    switch (data.type) {
      case "confirm":
        this.icon = "error"
        break;
      case "error":
        this.icon = "dangerous"
        break;
      case "info":
        this.icon = "check_circle"
        break;
      case "success":
        this.icon = "done"
        break;
      case "warn":
        this.icon = "warning_amber"
        break;

      default:
        break;
    }
  }

  ngOnInit() {
  }

}
