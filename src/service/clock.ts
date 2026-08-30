import { Temporal } from '@js-temporal/polyfill';
import type { CalendarDate } from '../value-object/calendar-date';

type ClockValue =
  | Date
  | CalendarDate
  | Temporal.Instant
  | Temporal.PlainDate
  | Temporal.ZonedDateTime;

export abstract class Clock<
  TNow extends ClockValue = Date,
  TToday extends ClockValue = CalendarDate,
> {
  abstract now(): TNow;

  abstract today(): TToday;
}
