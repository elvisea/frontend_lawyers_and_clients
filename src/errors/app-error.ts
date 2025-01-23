import { ErrorCode } from "@/enums/error-code";

export class AppError {
  error?: string;
  message?: string;
  errorCode: ErrorCode;
  statusCode: number;

  constructor(errorCode: ErrorCode, statusCode: number, error?: string, message?: string) {
    this.error = error;
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}
