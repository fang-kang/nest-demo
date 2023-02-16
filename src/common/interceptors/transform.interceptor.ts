import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CodeEnum, CodeMessage } from '../enums';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return {
          data,
          code: CodeEnum.Success,
          message: CodeMessage[CodeEnum.Success],
          success: true,
        };
      })
    );
  }
}
