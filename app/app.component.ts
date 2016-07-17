import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {
  AlertComponent, DATEPICKER_DIRECTIVES
} from 'ng2-bootstrap/ng2-bootstrap';
import { DatePickerInlineComponent } from './datepicker/bs-datepicker-inline.componet';
import * as moment from 'moment';
moment.locale('ru');

@Component({
  selector: 'my-app',
  directives: [AlertComponent, DATEPICKER_DIRECTIVES, NgModel,
    DatePickerInlineComponent],
  template: `
<br><hr>
<div class="row">
  <div class="col-md-6">
    <bs-datepicker-inline></bs-datepicker-inline>
  </div>
  <div class="col-md-6">
    <bs-datepicker-inline></bs-datepicker-inline>
  </div>
</div>

`
  // template: `
  //   <alert type="info">ng2-bootstrap hello world!</alert>
  //     <pre>Selected date is: <em *ngIf="dt">{{ getDate() |
  // date:'fullDate'}}</em></pre> <h4>Inline</h4> <div
  // style="display:inline-block; min-height:290px;"> <datepicker
  // [(ngModel)]="dt" [minDate]="minDate" [showWeeks]="true"></datepicker>
  // </div> `
})
export class AppComponent implements OnInit {
  public dt:Date = new Date();
  public minDate:Date = void 0;
  public events:Array<any>;
  public tomorrow:Date;
  public afterTomorrow:Date;
  public formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format:string = this.formats[0];
  public dateOptions:any = {
    formatYear: 'YY',
    startingDay: 1
  };
  public opened:boolean = false;
  public title:string = 'piu test';

  public getDate():number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public constructor() {
  }

  public ngOnInit():void {
  }
}
