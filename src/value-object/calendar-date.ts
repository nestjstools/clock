import { Temporal } from '@js-temporal/polyfill';

export class CalendarDate {
  private readonly year: number;
  private readonly month: number;
  private readonly day: number;

  private constructor(year: number, month: number, day: number) {
    if (!CalendarDate.isValidDate(year, month, day)) {
      throw new Error('Invalid date');
    }
    this.year = year;
    this.month = month;
    this.day = day;
  }

  static fromString(dateString: string): CalendarDate {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      throw new Error('Invalid date format');
    }
    const [year, month, day] = dateString.split('-').map(Number);
    return new CalendarDate(year, month, day);
  }

  static today(
    timeZone: Temporal.TimeZoneLike = Temporal.Now.timeZoneId(),
  ): CalendarDate {
    return CalendarDate.fromTemporal(Temporal.Now.plainDateISO(timeZone));
  }

  static fromDate(date: Date): CalendarDate {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return new CalendarDate(year, month, day);
  }

  static fromTemporal(date: Temporal.PlainDate): CalendarDate {
    return new CalendarDate(date.year, date.month, date.day);
  }

  static isValidDate(year: number, month: number, day: number): boolean {
    const d = new Date(year, month - 1, day);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month - 1 &&
      d.getDate() === day
    );
  }

  toString(): string {
    const mm = String(this.month).padStart(2, '0');
    const dd = String(this.day).padStart(2, '0');
    return `${this.year}-${mm}-${dd}`;
  }

  getYear(): number {
    return this.year;
  }

  getMonth(): number {
    return this.month;
  }

  getDay(): number {
    return this.day;
  }

  equals(other: CalendarDate): boolean {
    return (
      this.year === other.year &&
      this.month === other.month &&
      this.day === other.day
    );
  }

  toDate(): Date {
    return new Date(this.year, this.month - 1, this.day);
  }

  toTemporal(): Temporal.PlainDate {
    return Temporal.PlainDate.from({
      year: this.year,
      month: this.month,
      day: this.day,
    });
  }

  addDays(days: number): CalendarDate {
    if (days < 0) {
      throw new Error('days must be a positive number');
    }
    return CalendarDate.fromTemporal(this.toTemporal().add({ days }));
  }

  subtractDays(days: number): CalendarDate {
    if (days < 0) {
      throw new Error('days must be a positive number');
    }
    return CalendarDate.fromTemporal(this.toTemporal().subtract({ days }));
  }

  isBefore(other: CalendarDate): boolean {
    return (
      Temporal.PlainDate.compare(this.toTemporal(), other.toTemporal()) < 0
    );
  }

  isAfter(other: CalendarDate): boolean {
    return (
      Temporal.PlainDate.compare(this.toTemporal(), other.toTemporal()) > 0
    );
  }

  isSameOrBefore(other: CalendarDate): boolean {
    return this.isBefore(other) || this.equals(other);
  }

  isSameOrAfter(other: CalendarDate): boolean {
    return this.isAfter(other) || this.equals(other);
  }
}
