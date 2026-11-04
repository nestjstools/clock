import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SystemClock } from './service/system-clock';
import { Clock } from './service/i-clock';

const clockProviders: Provider[] = [
  {
    provide: Clock,
    useClass: SystemClock,
  },
  SystemClock,
];

@Module({})
export class ClockModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: ClockModule,
      providers: clockProviders,
      exports: clockProviders,
    };
  }

  static forFeature(): DynamicModule {
    return {
      global: false,
      module: ClockModule,
      providers: clockProviders,
      exports: clockProviders,
    };
  }
}
