export class ApiError extends Error {
  statusCode: number;
  errors?: any;
  success: boolean;
  data?: object | null;

  constructor(message: string, statusCode: number , errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.success = false;
  }
}
