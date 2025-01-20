import { CelebrateError, isCelebrateError } from 'celebrate';
import { BaseError } from '../errors';
import { NotFound } from '../errors/NotFound';
import { NextFunction, Request, Response } from 'express';

export class ErrorsController {
  async generateNotFoundError(_req: Request, _res: Response, next: NextFunction) {
    return next(new NotFound('Path not found'));
  }
  async catchCelebrateErrors(
    err: CelebrateError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (isCelebrateError(err)) {
      const validationDetails = Array.from(err.details.values())
        .map(detail => detail.message)
        .join(', ');

      res.status(400).send({
        error: true,
        message: validationDetails,
      });
    } else {
      next(err);
    }
  }
  // centralized error controller
  async catchErrors(err: Error, _req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseError) {
      res.status(err.statusCode).send({ error: true, message: err.message });
    } else {
      res.status(500).send({ error: true, message: 'An error has occurred' });
    }
    next();
  }
}

const errorsController = new ErrorsController();

export { errorsController };
