import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SystemClock } from './service/system-clock';
import { Service } from './dependency-injection/service'; // Consider renaming this

const clockProviders: Provider[] = [
  {
    provide: Service.CLOCK_SERVICE,
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
