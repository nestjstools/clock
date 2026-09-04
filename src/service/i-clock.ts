import { CalendarDate } from '../value-object/calendar-date';

export interface IClock {
  now(): Date;

  today(): CalendarDate;
}

export abstract class Clock implements IClock{
  abstract now(): Date;

  abstract today(): CalendarDate;
}
