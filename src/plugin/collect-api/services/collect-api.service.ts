import { Injectable, Logger } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { PERMISSION_META, PERMISSION_CLASS } from '../constants/collect';
import { IPermission, METHOD_METADATA, PATH_METADATA, RequestMethod } from '../types/collect.api';

@Injectable()
export class CollectApiService {
  logger = new Logger(CollectApiService.name);
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector
  ) {}

  /**
   * 当前系统全部接口权限
   * @returns
   */
  public async allPermissionList(): Promise<IPermission[] | undefined> {
    return await this.collectPermission();
  }

  /**
   * 收集权限
   * @returns
   */
  private async collectPermission(): Promise<IPermission[] | undefined> {
    console.log('开始收集权限');
    const resourceList: IPermission[] = [];
    const wrappers: InstanceWrapper[] = this.discoveryService.getControllers();
    for (const wrapper of wrappers) {
      const { instance } = wrapper;
      if (!instance) {
        return;
      }
      this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), async (key) => {
        /** 获取类上自定义注解(自定义) */
        const moduleName: string = Reflect.getMetadata(PERMISSION_CLASS, instance.constructor);
        /** 获取方法上的(自定义) */
        const methodName: string = this.reflector.get(PERMISSION_META, instance[key]);
        /** 类上的路径 */
        const baseUrl: string = Reflect.getMetadata(PATH_METADATA, instance.constructor);
        /** 方法上的路径 */
        const methodUrl: string = this.reflector.get(PATH_METADATA, instance[key]);
        /** 请求方式 */
        const method: string = RequestMethod[this.reflector.get(METHOD_METADATA, instance[key])];

        let url = baseUrl + '/' + methodUrl;
        url = url
          .replace('//', '/') // 去除双//
          .replace(/(.*)?\/$/, '$1') // 去除最后一个
          .replace(/\/:.*\w?/, '/*'); // 将:id全部转为*
        if (moduleName && methodName && method && url) {
          this.logger.log(`模块名称: ${moduleName}-方法名:${methodName}-请求方式:${method}-路径:${url}`);
          resourceList.push({
            moduleName,
            methodName,
            method,
            url,
          });
        }
      });
    }
    return resourceList;
  }
}
