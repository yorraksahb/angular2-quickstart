import { Component, OnInit } from '@angular/core';
// import { DatePickerComponent } from 'ng2-bootstrap/ng2-bootstrap';
import * as moment from 'moment';
import { DatePickerComponent } from './datepicker/bs-date-picker.component';
import { NgModel } from '@angular/forms';
import { JsonPipe } from '@angular/common';
moment.locale('ru');

@Component({
  selector: 'my-app',
  directives: [DatePickerComponent, NgModel],
  template: `
<input type="text" [(ngModel)]="opts.mode">
<input type="text" [(ngModel)]="opts.viewMode">
<button class="btn btn-success btn-sm" (click)="refresh()">refresh</button>
<pre>{{opts | json}}</pre>
<div class="row">
    <bs-datepicker [options]="opts"></bs-datepicker>
    <!--<bs-datepicker-inline [options]="opts"></bs-datepicker-inline>-->
</div>

`

})
export class AppComponent implements OnInit {
  public opts:any = {
    mode: 'date',
    viewMode: 'months',
    ui: {
      minMode: 'days',
      maxMode: 'days'
    },
    customDates: [{
      date: moment().subtract(15, 'days'),
      isDisabled: true
    }],
    date: {
      // min : moment().subtract(5, 'days')
    }
  };

  public constructor() {
  }

  public refresh() {
    this.opts = Object.assign({}, this.opts);
  }

  public ngOnInit():void {
  }
}
