export default {
  // 端口
  port: parseInt(process.env.PORT, 3001) || 3001,
  prefix: 'api',
  baseUrl: 'localhost:3001/',
  tokenExpire: 1,
  // 是否开启swagger
  enableSwagger: true,
  lbsKey: 'LW7BZ-NB7C5-QNDSX-VCZVT-D7FQ4',
  // 数据库配置
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'nest_demo',
    charset: 'utf8mb4',
    synchronize: false, // 是否在每次应用程序启动时自动创建数据库架构
    logging: true,
  },
};
