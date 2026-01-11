export class ApiError extends Error {
  statusCode: number;
  errors?: any;
  success: boolean;
  data: object | null;

  constructor(statusCode: number, message: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.data = null;

    Error.captureStackTrace(this, this.constructor);
  }
}
