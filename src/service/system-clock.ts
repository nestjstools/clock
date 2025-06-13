import { IClock } from './i-clock';

export class SystemClock implements IClock {
  now(): Date {
    return new Date();
  }
}
