import { DateClock } from './clock';
import { CalendarDate } from '../../value-object/calendar-date';

export class SystemClock extends DateClock {
  now(): Date {
    return new Date();
  }

  today(): CalendarDate {
    return CalendarDate.today();
  }
}
