import { Temporal } from '@js-temporal/polyfill';
import { TemporalClock } from './clock';

export class TemporalFixedClock extends TemporalClock {
  constructor(
    private readonly instant: Temporal.Instant,
    private readonly timeZone: Temporal.TimeZoneLike = Temporal.Now.timeZoneId(),
  ) {
    super();
  }

  now(): Temporal.Instant {
    return this.instant;
  }

  today(): Temporal.PlainDate {
    return this.instant.toZonedDateTimeISO(this.timeZone).toPlainDate();
  }
}
