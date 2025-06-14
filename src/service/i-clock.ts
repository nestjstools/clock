import { CalendarDate } from '../value-object/calendar-date';

export interface IClock {
  now(): Date;

  today(): CalendarDate;
}
