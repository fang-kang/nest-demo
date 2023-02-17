import { applyDecorators, SetMetadata } from '@nestjs/common';
import { PERMISSION_CLASS } from '../constants/collect';

/**
 * 使用在类上的装饰器
 * @param name
 * @returns
 */
export const PermissionClass = (name: string): MethodDecorator & ClassDecorator => {
  return applyDecorators(SetMetadata(PERMISSION_CLASS, name));
};
