<p align="center">
  <img src="nestjstools-logo.png" width="400" alt="NestJSTools Logo" />
</p>

# NestJS Clock

`@nestjstools/clock` provides testable Date and Temporal clocks for NestJS. Instead of spreading `new Date()` calls through application code, inject the clock abstraction that matches the time model your feature needs.

## Installation

```bash
npm install @nestjstools/clock
# or
yarn add @nestjstools/clock
```

Temporal support is implemented with `@js-temporal/polyfill`. Install that package directly in an application when constructing `Temporal` values yourself (for example, for `TemporalFixedClock`).

## Clock contracts

| Contract | `now()` | `today()` | Use when |
| --- | --- | --- | --- |
| `DateClock` | `Date` | `CalendarDate` | Working with existing Date-based APIs |
| `TemporalClock` | `Temporal.Instant` | `Temporal.PlainDate` | Working with absolute instants |
| `ZonedTemporalClock` | `Temporal.ZonedDateTime` | `Temporal.PlainDate` | Working with local time in a known timezone |

Each contract is an abstract class and a Nest injection token. This gives correct TypeScript autocomplete without custom decorators or string tokens.

## NestJS setup

Register the module once, normally in the root module:

```ts
import { Module } from '@nestjs/common';
import { ClockModule } from '@nestjstools/clock';

@Module({
  imports: [ClockModule.forRoot()],
})
export class AppModule {}
```

`DateClock`, `TemporalClock`, and `ZonedTemporalClock` are all registered. The optional `timeZone` config controls the timezone used by `ZonedTemporalClock`; it defaults to the system timezone.

```ts
ClockModule.forRoot({
  timeZone: 'Europe/Warsaw',
});
```

Use `ClockModule.forFeature()` when the clock module should not be global. It accepts the same optional configuration.

## Injecting a clock

Inject the abstract class directly. No `@Inject()` or custom decorator is required.

### Date clock

```ts
import { Injectable } from '@nestjs/common';
import { DateClock } from '@nestjstools/clock';

@Injectable()
export class SubscriptionService {
  constructor(private readonly clock: DateClock) {}

  isActive(endDate: Date): boolean {
    return this.clock.now() < endDate;
  }
}
```

### Temporal clock

```ts
import { Injectable } from '@nestjs/common';
import { TemporalClock } from '@nestjstools/clock';

@Injectable()
export class EventService {
  constructor(private readonly clock: TemporalClock) {}

  createdAt() {
    return this.clock.now(); // Temporal.Instant
  }
}
```

### Zoned Temporal clock

```ts
import { Injectable } from '@nestjs/common';
import { ZonedTemporalClock } from '@nestjstools/clock';

@Injectable()
export class DailyReportService {
  constructor(private readonly clock: ZonedTemporalClock) {}

  currentLocalTime() {
    return this.clock.now(); // Temporal.ZonedDateTime
  }
}
```

## Clock implementations

### Date clocks

```ts
import { FixedClock, SystemClock } from '@nestjstools/clock';

const systemClock = new SystemClock();
systemClock.now(); // Date
systemClock.today(); // CalendarDate

const fixedClock = new FixedClock(new Date('2025-01-01T12:00:00Z'));
fixedClock.now(); // a copy of the fixed Date
fixedClock.today(); // CalendarDate for the fixed day
```

### Temporal clocks

```ts
import { Temporal } from '@js-temporal/polyfill';
import {
  TemporalFixedClock,
  TemporalSystemClock,
  ZonedSystemClock,
} from '@nestjstools/clock';

const instantClock = new TemporalSystemClock();
instantClock.now(); // Temporal.Instant

const fixedClock = new TemporalFixedClock(
  Temporal.Instant.from('2025-06-14T23:30:00Z'),
  'Europe/Warsaw',
);
fixedClock.today(); // Temporal.PlainDate: 2025-06-15

const zonedClock = new ZonedSystemClock('UTC');
zonedClock.now(); // Temporal.ZonedDateTime in UTC
```

## Testing

Override the abstract token with a fixed implementation:

```ts
import { Test } from '@nestjs/testing';
import { DateClock, FixedClock } from '@nestjstools/clock';

const moduleRef = await Test.createTestingModule({
  providers: [SubscriptionService],
})
  .overrideProvider(DateClock)
  .useValue(new FixedClock(new Date('2020-10-10T00:00:00Z')))
  .compile();
```

For Temporal code, override `TemporalClock` with `TemporalFixedClock`, or `ZonedTemporalClock` with a custom fixed zoned implementation.

## CalendarDate

`CalendarDate` is an immutable date-only value object. It has no time or timezone and is useful for domain concepts such as billing dates, birthdays, and reporting days.

```ts
import { Temporal } from '@js-temporal/polyfill';
import { CalendarDate } from '@nestjstools/clock';

const date = CalendarDate.fromString('2025-06-14');
const nextWeek = date.addDays(7);

const temporalDate = date.toTemporal(); // Temporal.PlainDate
const fromTemporal = CalendarDate.fromTemporal(
  Temporal.PlainDate.from('2025-06-14'),
);

fromTemporal.equals(date); // true
```

## Links

- https://docs.nestjstools.com/clock
- https://nestjstools.com
