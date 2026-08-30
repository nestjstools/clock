import { Temporal } from '@js-temporal/polyfill';
import { Clock } from '../clock';

export abstract class ZonedTemporalClock extends Clock<
  Temporal.ZonedDateTime,
  Temporal.PlainDate
> {}
