import { Clock } from './i-clock';
import { CalendarDate } from '../value-object/calendar-date';

export class SystemClock extends Clock {
  now(): Date {
    return new Date();
  }

  today(): CalendarDate {
    return CalendarDate.fromDate(new Date());
  }
}
