import { DateClock } from './clock';
import { CalendarDate } from '../../value-object/calendar-date';

export class FixedClock extends DateClock {
  constructor(private readonly date: Date) {
    super();
  }

  now(): Date {
    return new Date(this.date);
  }

  today(): CalendarDate {
    return CalendarDate.fromDate(this.date);
  }
}
