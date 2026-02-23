<p align="center">
    <image src="nestjstools-logo.png" width="400" alt="NestJSTools Logo" />
</p>

# NestJS Clock – Time Abstraction & Date Provider for Testable Applications

## Introduction

In many NestJS applications, time handling is critical - whether it's timestamps, expiration checks, scheduling, domain logic, or logging.

Calling `new Date()` directly throughout your code makes unit testing difficult and tightly couples your business logic to system time.

`@nestjstools/clock` is a lightweight **NestJS time abstraction library** that provides a clean `IClock` interface for injecting time providers via dependency injection.

It enables:

- Deterministic testing with a fixed clock
- Clean separation of infrastructure concerns
- Better testability and maintainability

This library is ideal for **clean architecture, hexagonal architecture, and time-dependent domain logic in NestJS applications.**

## Documentation

* https://docs.nestjstools.com/clock
* https://nestjstools.com

## Features

- Abstraction of time handling via the `IClock` interface
- Swappable implementations: `SystemClock` (real time) and `FixedClock` (test time)
- Perfect for mocking time in NestJS unit tests
- Seamless integration with NestJS dependency injection
- Clean separation between domain logic and system time
- Includes `CalendarDate` value object for date-only domain modeling
- Lightweight and dependency-free

## Installation

```bash
npm install @nestjstools/clock
#or
yarn add @nestjstools/clock
```

## Usage

### SystemClock

Returns the actual current system time.

```ts
import { SystemClock } from '@nestjstools/clock';

const clock = new SystemClock();
console.log(clock.now()); // → current system date/time
```

### FixedClock

Returns a fixed date/time—ideal for deterministic tests.

```ts
import { FixedClock } from '@nestjstools/clock';

const fixedDate = new Date('2023-01-01T00:00:00Z');
const clock = new FixedClock(fixedDate);

console.log(clock.now()); // → always returns 2023-01-01T00:00:00Z - helpful in tests
```

## NestJS Integration

You can easily register the clock as a provider in your modules:

```ts
import { Module } from '@nestjs/common';
import { ClockModule } from '@nestjstools/clock';

@Module({
  imports: [
    ClockModule.forRoot(), //By default global - .forFeature() also available
  ]
})
export class AppModule {}
```

Inject the clock into your services (example):

```ts
import { Injectable } from '@nestjs/common';
import { IClock, Clock } from '@nestjstools/clock';

@Injectable()
export class SubscriptionService {
  constructor(@Clock() private readonly clock: IClock) {}

  isSubscriptionActive(startDate: Date, durationDays: number): boolean {
    const now = this.clock.now();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationDays);

    return now < endDate;
  }
}
```

### Testing Example

Swap out the system clock with a fixed one in your test setup:

```ts
import { Test } from '@nestjs/testing';
import { SubscriptionService } from './subscription.service';
import { FixedClock, Service } from '@nestjstools/clock';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SubscriptionService,
      ],
    })
      .overrideProvider(Service.CLOCK_SERVICE)
      .useValue(new FixedClock(new Date('2020-10-10T00:00:00Z')))
      .compile();

    service = moduleRef.get(SubscriptionService);
  });

  it('returns true when subscription is still active', () => {
    const start = new Date('2020-10-01T00:00:00Z');
    const active = service.isSubscriptionActive(start, 20); // expires 2020-10-21

    expect(active).toBe(true);
  });

  it('returns false when subscription has expired', () => {
    const start = new Date('2020-09-01T00:00:00Z');
    const active = service.isSubscriptionActive(start, 20); // expires 2020-09-21

    expect(active).toBe(false);
  });
});
```

---

## CalendarDate Value Object

**CalendarDate** is a simple and immutable value object representing a calendar date without time or timezone information, storing only the year, month, and day. It ensures valid date creation and provides convenient methods for manipulation and comparison.

* Immutable representation of a date in `YYYY-MM-DD` format.
* Creation from string (`YYYY-MM-DD`) or native `Date` objects.
* Validation to prevent invalid dates.
* Comparison methods (`equals`, `isBefore`, `isAfter`, etc.).
* Methods to add or subtract days safely.
* Conversion back to native `Date` objects (with time zeroed).
* Useful for date-only domain logic where time is irrelevant.

### Usage as value object

```ts
import { CalendarDate } from '../value-object/calendar-date';

// Create from string
const date1 = CalendarDate.fromString('2025-06-14');

// Create from native Date
const date2 = CalendarDate.fromDate(new Date());

// Get today's date as CalendarDate
const today = CalendarDate.today();

// Manipulate dates
const nextWeek = today.addDays(7);
const yesterday = today.subtractDays(1);

// Compare dates
if (date1.isBefore(nextWeek)) {
  console.log(`${date1.toString()} is before ${nextWeek.toString()}`);
}

// Convert back to native Date
const nativeDate = date1.toDate();
```
### In NestJS Dependency Injection
```ts
import { Injectable } from '@nestjs/common';
import { IClock, Clock } from '@nestjstools/clock';

@Injectable()
export class ReturnToday {
  constructor(@Clock() private readonly clock: IClock) {}

  todayIs(): string {
    const today = this.clock.today();
    return today.toString(); // output in format YYYY-MM-DD
  }
}
```

## Benefits

* Avoid scattered use of `new Date()` in your business logic
* Lightweight and dependency-free
* Improve the testability and maintainability of your time-dependent logic
* Fits well in clean architecture and DDD practices

## Keywords

nestjs clock, nestjs time provider, nestjs mock date, nestjs test time,
nestjs calendar date, typescript date value object, clean architecture time abstraction
