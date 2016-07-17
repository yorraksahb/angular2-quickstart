import * as moment from 'moment';

export class DateUtilsService {
  public static getCalendarMatrix(currentMonth: any, options: any):any {
    //
    // Build the matrix of dates that will populate the calendar
    //
    const calendar1 = {
      month: currentMonth,
      firstDay: void 0,
      lastDay: void 0
    };
    // current date
    const month = currentMonth.month();
    const year = currentMonth.year();
    const hour = currentMonth.hour();
    const minute = currentMonth.minute();
    const second = currentMonth.second();
    // month range
    const daysInMonth = moment([year, month]).daysInMonth();
    const firstDay = moment([year, month, 1]);
    const lastDay = moment([year, month, daysInMonth]);
    // prev
    const lastMonth = moment(firstDay).subtract(1, 'month').month();
    const lastYear = moment(firstDay).subtract(1, 'month').year();
    const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    const dayOfWeek = firstDay.day();

    // initialize a 6 rows x 7 columns array for the calendar
    const calendarW = 6;
    const calendarH = 7;
    const calendar = new Array(calendarW);
    calendar1.firstDay = firstDay;
    calendar1.lastDay = lastDay;

    // initialize weeks row
    const weeks = new Array(calendarH);
    for (let j = 0; j < calendarW; j++) {
      calendar[j] = new Array(calendarH);
    }

    // populate the calendar with date objects
    let startDay = daysInLastMonth - dayOfWeek + options.locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }

    if (dayOfWeek === options.locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }

    let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
    // where the f*** 42 came from
    for (let [i, col,row] = [0, 0, 0]; i < calendarH * calendarW; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
      if (i > 0 && col % 7 === 0) {
        col = 0;
        row++;
      }
      if (col === 0) {
        weeks[row] = curDate.week();
      }

      calendar[row][col] = {
        date: curDate.clone().hour(hour).minute(minute).second(second),
        label: curDate.date()
      };
      curDate.hour(12);

      // todo: take in account min and max dates
      // if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
      //   calendar[row][col] = this.minDate.clone();
      // }
      //
      // if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
      //   calendar[row][col] = this.maxDate.clone();
      // }
    }

    return {weeks, calendar};
  }
}
