import { IClock } from './i-clock';
import { CalendarDate } from '../value-object/calendar-date';

export class SystemClock implements IClock {
  now(): Date {
    return new Date();
  }

  today(): CalendarDate {
    return CalendarDate.fromDate(new Date());
  }
}
