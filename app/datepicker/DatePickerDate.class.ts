import { DatePickerBase } from './bs-datepicker-base.class';
export class DatePickerDate {
  public isActive: boolean;
  public isSelected: boolean;
  public date: any;

  public constructor(date: any, opts: Object, base: DatePickerBase) {
    this.date = date;
    this.isActive = base.isActive(date);
    this.isSelected = base.isSelected(date);
    Object.assign(this, opts);
  }
}
