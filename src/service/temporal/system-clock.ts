import { Temporal } from '@js-temporal/polyfill';
import { TemporalClock } from './clock';

export class TemporalSystemClock extends TemporalClock {
  now(): Temporal.Instant {
    return Temporal.Now.instant();
  }

  today(): Temporal.PlainDate {
    return Temporal.Now.plainDateISO();
  }
}
