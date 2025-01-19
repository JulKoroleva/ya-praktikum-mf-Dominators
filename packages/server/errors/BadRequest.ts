import { BaseError } from './BaseError';

export class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}
