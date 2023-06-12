// ========== Response Types
// import all modules
import { HttpStatus } from '@nestjs/common';

export interface IResponse<T> {
  statusCode: HttpStatus;
  message: string;
  data?: T | T[];
  errors?: Record<string, string[]>;
}
