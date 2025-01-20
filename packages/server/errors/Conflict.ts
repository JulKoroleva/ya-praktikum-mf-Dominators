import { BaseError } from './BaseError';

export class Conflict extends BaseError {
  constructor(message: string) {
    super(message, 409);
  }
}
