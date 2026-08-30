import { Temporal } from '@js-temporal/polyfill';
import { TemporalFixedClock } from '../../../src/service/temporal/fixed-clock';
import { ZonedSystemClock } from '../../../src/service/temporal/zoned-system-clock';

describe('TemporalFixedClock', () => {
  it('returns the fixed instant and its date in the configured timezone', () => {
    const instant = Temporal.Instant.from('2025-06-14T23:30:00Z');
    const clock = new TemporalFixedClock(instant, 'Europe/Warsaw');

    expect(clock.now()).toBe(instant);
    expect(clock.today().toString()).toBe('2025-06-15');
  });
});

describe('ZonedSystemClock', () => {
  it('returns a current time and date in its configured timezone', () => {
    const clock = new ZonedSystemClock('UTC');
    const now = clock.now();

    expect(now.timeZoneId).toBe('UTC');
    expect(clock.today().toString()).toBe(now.toPlainDate().toString());
  });
});
