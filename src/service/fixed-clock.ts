import { IClock } from './i-clock';
import { CalendarDate } from '../value-object/calendar-date';

export class FixedClock implements IClock {
  constructor(private readonly date: Date) {
  }

  now(): Date {
    return this.date;
  }

  today(): CalendarDate {
    return CalendarDate.fromDate(this.date);
  }
}
