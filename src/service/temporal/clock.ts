import { Temporal } from '@js-temporal/polyfill';
import { Clock } from '../clock';

export abstract class TemporalClock extends Clock<
  Temporal.Instant,
  Temporal.PlainDate
> {}
