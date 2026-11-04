import { Clock } from './i-clock';
import { CalendarDate } from '../value-object/calendar-date';

export class FixedClock extends Clock {
  constructor(private readonly date: Date) {
    super();
  }

  now(): Date {
    return this.date;
  }

  today(): CalendarDate {
    return CalendarDate.fromDate(this.date);
  }
}
