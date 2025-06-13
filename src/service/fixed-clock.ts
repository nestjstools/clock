import { IClock } from './i-clock';

export class FixedClock implements IClock {
  constructor(private readonly date: Date) {
  }

  now(): Date {
    return this.date;
  }
}
