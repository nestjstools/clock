import { FixedClock } from '../../../src/service/date/fixed-clock';

describe('FixedClock', () => {
  it('returns a copy of the fixed date and its local calendar day', () => {
    const clock = new FixedClock(new Date(2025, 5, 14, 15, 30));

    expect(clock.now()).toEqual(new Date(2025, 5, 14, 15, 30));
    expect(clock.today().toString()).toBe('2025-06-14');
  });
});
