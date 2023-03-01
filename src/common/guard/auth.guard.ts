import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getUrlQuery } from '@src/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token =
      context.switchToRpc().getData().headers.token ||
      context.switchToHttp().getRequest().body.token ||
      getUrlQuery(request.url, 'token');
    console.log(token, '当前token----');
    if (token) {
      return true;
    } else {
      throw new HttpException('请传递token', HttpStatus.FORBIDDEN);
    }
  }
}
