declare interface IConfig {
  /**
   * 端口
   */
  port: number;
  /**
   * api前缀
   */
  prefix: string;
  baseUrl: string;
  /**
   * token过期时间
   */
  tokenExpire: number;
  database: IDataBase;
}

interface IDataBase {
  type: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  charset: string;
  logging: boolean;
  synchronize: boolean;
}
