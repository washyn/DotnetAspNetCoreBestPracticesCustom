import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {NotifyData} from "../../services/notify.service";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: NotifyData) { }

  ngOnInit() {
  }

}
