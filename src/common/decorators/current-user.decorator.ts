import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 定义当前用户的数据类型
 */
export interface ICurrentUserType {
  id: number;
  userName: string;
}

export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (data && request.user) {
    return request.user[data];
  } else {
    return request.user;
  }
});
