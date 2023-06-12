// ========== Response Interceptor
// import all modules
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IResponse } from 'src/types';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(_: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((response: IResponse<T>) => {
        const responseBody: IResponse<T> = {
          statusCode: response?.statusCode ?? HttpStatus.OK,
          message: response?.message ?? 'Ok',
        };

        if (typeof response !== 'object') responseBody.data = response;
        if (response?.data) responseBody.data = response.data;
        if (response?.errors) responseBody.errors = response.errors;

        throw new HttpException(responseBody, responseBody.statusCode);
      }),
    );
  }
}
