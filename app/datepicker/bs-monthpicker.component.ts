import { Component,Inject } from '@angular/core';
import * as moment from 'moment';
import { DatePickerBase } from './bs-datepicker-base.class';
import { DatePickerService } from './bs-datepicker.service';

@Component({
  selector: 'bs-monthpicker',
  exportAs: 'bs-monthpicker',
  moduleId: module.id,
  templateUrl: './bs-monthpicker.html'
})
export class MonthPickerComponent extends DatePickerBase {
  public monthNames:string[] =  moment.months();
  public months:any[][];
  public title: string;

  public constructor(datePickerService:DatePickerService) {
    super(datePickerService);
    this.refresh(datePickerService.viewDate);
    datePickerService.viewDateChanged.subscribe((event:any) => {
      this.refresh(event.value);
    });
  }

  public refresh(currentMonth:any):void {
    this.title = currentMonth.year();

    const w = 3;
    const h = 4;
    this.months = new Array(h);
    for (let row = 0; row < h; row++) {
      this.months[row] = new Array(w);
      for (let coll = 0; coll < w; coll++) {
        let monthNum = row*w + coll;
        this.months[row][coll] = {
          date: moment([currentMonth.year(), monthNum, 1]),
          label: this.monthNames[monthNum],
          isActive: monthNum === currentMonth.month()
        };
      }
    }
  }
}
