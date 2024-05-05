import { Response } from 'express';
import {
  STATUS_CODES_ERROR,
  STATUS_CODES_OK,
  STATUS_MAP,
} from '../configs/constants';

type Status = 'OK' | 'ERROR' | 'UNKNOWN';

export default class ResponseFactory {
  static create(
    statusCode: number,
    res: Response,
    message?: string,
  ): HttpSuccess | HttpError | undefined {
    if (typeof statusCode !== 'number' || !Number.isInteger(statusCode)) {
      throw new Error(
        'statusCode required and must be an integer number to construct response',
      );
    }

    const status = STATUS_CODES_OK.includes(statusCode)
      ? 'OK'
      : STATUS_CODES_ERROR.includes(statusCode)
        ? 'ERROR'
        : 'UNKNOWN';

    message = message || STATUS_MAP[statusCode] || 'Unknown Error';

    let response;
    switch (status) {
      case 'OK':
        response = new HttpSuccess(status, statusCode, message, res);
      case 'ERROR':
        response = new HttpError(message, statusCode, res);
      case 'OK':
        response = new HttpError(message, 500, res);
      default:
        break;
    }

    return response;
  }
}

export class HttpSuccess {
  status: Status;
  statusCode: number;
  message: string;
  res: Response;
  constructor(
    status: Status,
    statusCode: number,
    message: string,
    res: Response,
  ) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.res = res;
  }

  json(body: { [key: string]: any }, withMsg: boolean = true) {
    this.res
      .status(this.statusCode)
      .json(withMsg ? { ...body, message: this.message } : body);
  }
  send(data: any) {
    this.res.status(this.statusCode).send(data);
  }
}

export class HttpError extends Error {
  statusCode: number;
  res: Response;
  constructor(message: string, statusCode: number, res: Response) {
    super(message);
    this.statusCode = statusCode;
    this.res = res;
  }

  response(body: any) {
    this.res.json({ ...body, message: this.message });
  }
  responseWithStatus(body: any) {
    this.res.status(this.statusCode).json({ ...body, message: this.message });
  }
}
