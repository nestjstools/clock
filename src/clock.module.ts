import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SystemClock } from './service/date/system-clock';
import { DateClock } from './service/date/clock';
import { TemporalClock } from './service/temporal/clock';
import { TemporalSystemClock } from './service/temporal/system-clock';
import { ZonedTemporalClock } from './service/temporal/zoned-clock';
import { ZonedSystemClock } from './service/temporal/zoned-system-clock';
import { Temporal } from '@js-temporal/polyfill';

export interface ClockModuleOptions {
  timeZone?: Temporal.TimeZoneLike;
}

const createClockProviders = (options: ClockModuleOptions): Provider[] => [
  SystemClock,
  TemporalSystemClock,
  {
    provide: ZonedSystemClock,
    useFactory: () =>
      new ZonedSystemClock(options.timeZone ?? Temporal.Now.timeZoneId()),
  },
  {
    provide: DateClock,
    useExisting: SystemClock,
  },
  {
    provide: TemporalClock,
    useExisting: TemporalSystemClock,
  },
  {
    provide: ZonedTemporalClock,
    useExisting: ZonedSystemClock,
  },
];

@Module({})
export class ClockModule {
  static forRoot(options: ClockModuleOptions = {}): DynamicModule {
    const clockProviders = createClockProviders(options);

    return {
      global: true,
      module: ClockModule,
      providers: clockProviders,
      exports: clockProviders,
    };
  }

  static forFeature(options: ClockModuleOptions = {}): DynamicModule {
    const clockProviders = createClockProviders(options);

    return {
      global: false,
      module: ClockModule,
      providers: clockProviders,
      exports: clockProviders,
    };
  }
}
