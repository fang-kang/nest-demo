import { applyDecorators, SetMetadata } from '@nestjs/common';
import { PERMISSION_META } from '../constants/collect';

/**
 * 使用在方法上的装饰器
 * @param name
 * @returns
 */
export const PermissionMeta = (name: string): MethodDecorator & ClassDecorator => {
  return applyDecorators(SetMetadata(PERMISSION_META, name));
};
