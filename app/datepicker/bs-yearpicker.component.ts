import { Component } from '@angular/core';
import * as moment from 'moment';
import { DatePickerBase } from './bs-datepicker-base.class';
import { DatePickerService } from './bs-datepicker.service';
import { DatePickerOptions } from './bs-datepicker-options.provider';

@Component({
  selector: 'bs-yearpicker',
  exportAs: 'bs-yearpicker',
  moduleId: module.id,
  templateUrl: './bs-yearpicker.html'
})
export class YearPickerComponent extends DatePickerBase {
  public yearsStep:number = 20;
  public title:string;

  public yearsMatrix:any;

  public constructor(datePickerService:DatePickerService, options: DatePickerOptions) {
    super(datePickerService, options);
    this.refresh(datePickerService.viewDate);
    datePickerService.viewDateChange.subscribe((event:any) => {
      this.refresh(event.value);
    });
  }

  public refresh(currentYear:any):void {
    let year = this.getStartingYear(currentYear.year(), this.yearsStep);
    this.title = [year, year + this.yearsStep].join(' - ');

    const w = 5;
    const h = 4;
    this.yearsMatrix = new Array(h);
    for (let row = 0; row < h; row++) {
      this.yearsMatrix[row] = new Array(w);
      for (let coll = 0; coll < w; coll++, year++) {
        this.yearsMatrix[row][coll] = {
          date: moment([year, currentYear.month()]),
          label: year
        };
      }
    }
  }

  private getStartingYear(year:number, yearsStep:number):number {
    // return ((year - 1) / this.yearsStep) * this.yearsStep + 1;
    return year - year % yearsStep;
  }
}
