import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import NodeAuth from 'simp-node-auth';

@Injectable()
export class ToolsService {
  private nodeAuth: NodeAuth;
  constructor() {
    this.nodeAuth = new NodeAuth();
  }

  /**
   *
   *创建一个生成uuid的方法
   * @readonly
   * @type {string}
   * @memberof ToolsService
   */
  public get uuidToken(): string {
    return uuidv4().replace(/-/g, '');
  }

  /**
   * 获取当前ip地址
   * @param req
   * @returns
   */
  getReqIP(req: Request): string {
    const currentIp =
      ((req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress)?.replace('::ffff:', '') ?? '';
    // 处理代理后的多个ip地址,只拿第一个ip
    if (currentIp.split(',').length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return currentIp.split(',').shift()!;
    } else {
      return currentIp;
    }
  }

  /**
   * 密码加密的方法
   * @param password
   * @returns
   */
  makePassword(password: string): string {
    return this.nodeAuth.makePassword(password);
  }

  /**
   * 校验密码
   * @param password 未加密
   * @param sqlPassword 加密后
   * @returns
   */
  checkPassword(password: string, sqlPassword: string): boolean {
    return this.nodeAuth.checkPassword(password, sqlPassword);
  }
}
