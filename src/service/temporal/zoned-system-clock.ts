import { Temporal } from '@js-temporal/polyfill';
import { ZonedTemporalClock } from './zoned-clock';

export class ZonedSystemClock extends ZonedTemporalClock {
  constructor(private readonly timeZone: Temporal.TimeZoneLike) {
    super();
  }

  now(): Temporal.ZonedDateTime {
    return Temporal.Now.zonedDateTimeISO(this.timeZone);
  }

  today(): Temporal.PlainDate {
    return this.now().toPlainDate();
  }
}
