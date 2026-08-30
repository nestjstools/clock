import { Clock } from '../clock';
import type { CalendarDate } from '../../value-object/calendar-date';

export abstract class DateClock extends Clock<Date, CalendarDate> {}
