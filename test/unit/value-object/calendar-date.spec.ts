import { CalendarDate } from '../../../src/value-object/calendar-date';

describe('CalendarDate', () => {
  it('creates instance from valid string', () => {
    const date = CalendarDate.fromString('2025-06-14');
    expect(date.getYear()).toBe(2025);
    expect(date.getMonth()).toBe(6);
    expect(date.getDay()).toBe(14);
    expect(date.toString()).toBe('2025-06-14');
  });

  it('creates instance from Date object', () => {
    const jsDate = new Date(2025, 5, 14); // June 14, 2025 (month zero-based)
    const calendarDate = CalendarDate.fromDate(jsDate);
    expect(calendarDate.toString()).toBe('2025-06-14');
  });

  it('today() returns today\'s date', () => {
    const today = new Date();
    const calendarToday = CalendarDate.today();
    expect(calendarToday.getYear()).toBe(today.getFullYear());
    expect(calendarToday.getMonth()).toBe(today.getMonth() + 1);
    expect(calendarToday.getDay()).toBe(today.getDate());
  });

  it('equals method works correctly', () => {
    const date1 = CalendarDate.fromString('2025-06-14');
    const date2 = CalendarDate.fromDate(new Date(2025, 5, 14));
    const date3 = CalendarDate.fromString('2025-06-15');
    expect(date1.equals(date2)).toBe(true);
    expect(date1.equals(date3)).toBe(false);
  });

  it('isValidDate returns correct results', () => {
    expect(CalendarDate.isValidDate(2025, 6, 14)).toBe(true);
    expect(CalendarDate.isValidDate(2025, 2, 29)).toBe(false);
    expect(CalendarDate.isValidDate(2024, 2, 29)).toBe(true);
    expect(CalendarDate.isValidDate(2025, 13, 1)).toBe(false);
    expect(CalendarDate.isValidDate(2025, 0, 1)).toBe(false);
  });

  it('throws error for invalid date strings', () => {
    expect(() => CalendarDate.fromString('2025-02-30')).toThrow('Invalid date');
    expect(() => CalendarDate.fromString('2025-13-01')).toThrow('Invalid date');
    expect(() => CalendarDate.fromString('2025-00-10')).toThrow('Invalid date');
    expect(() => CalendarDate.fromString('invalid-string')).toThrow('Invalid date');
    expect(() => CalendarDate.fromString('2025-6-5')).toThrow('Invalid date');
  });

  it('throws if addDays receives negative', () => {
    expect(() => CalendarDate.fromString('2025-12-01').addDays(-1)).toThrow('days must be a positive number');
    expect(() => CalendarDate.fromString('2025-12-01').subtractDays(-1)).toThrow('days must be a positive number');
  });

  it('addDays and subtractDays work correctly', () => {
    const date = CalendarDate.fromString('2025-06-14');
    expect(date.addDays(1).toString()).toBe('2025-06-15');
    expect(date.subtractDays(1).toString()).toBe('2025-06-13');
    expect(date.subtractDays(5).toString()).toBe('2025-06-09');
  });

  it('comparison methods work as expected', () => {
    const d1 = CalendarDate.fromString('2025-06-14');
    const d2 = CalendarDate.fromString('2025-06-15');
    expect(d1.isBefore(d2)).toBe(true);
    expect(d2.isBefore(d1)).toBe(false);
    expect(d2.isAfter(d1)).toBe(true);
    expect(d1.isAfter(d2)).toBe(false);
    expect(d1.isSameOrBefore(d2)).toBe(true);
    expect(d1.isSameOrBefore(d1)).toBe(true);
    expect(d2.isSameOrAfter(d1)).toBe(true);
    expect(d1.isSameOrAfter(d1)).toBe(true);
  });
});
