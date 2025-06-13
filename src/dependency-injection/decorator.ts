import { Inject } from '@nestjs/common';

export const Clock = () => Inject('CLOCK_SERVICE');
