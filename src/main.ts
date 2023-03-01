import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as express from 'express';
import * as compression from 'compression';
import { IS_DEV } from './utils';
import config from './config';
import { join } from 'path';

const PORT = config.port || 8080;
const PREFIX = config.prefix || '/';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  console.log(IS_DEV, '是否为开发环境');
  console.log(process.env.NODE_ENV, 'NODE_ENV');
  const app = await NestFactory.create(AppModule, {
    // 开启日志级别打印
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });
  //允许跨域请求
  app.enableCors();
  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);
  let rootDir: string;
  if (IS_DEV) {
    rootDir = join(__dirname, '..');
  } else {
    rootDir = join(__dirname, '.');
  }

  const options = new DocumentBuilder()
    .setTitle('权限系统管理  api文档')
    .setDescription('权限系统管理  api接口文档')
    .setBasePath(PREFIX)
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);

  app.use('/public', express.static(join(rootDir, 'public')));

  // Web漏洞的
  app.use(helmet());
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencode
  // 开启gzip
  app.use(compression());

  await app.listen(PORT, () => {
    logger.log(`服务已经启动,接口请访问:http://wwww.localhost:${PORT}/${PREFIX}`);
    logger.log(`服务已经启动,文档请访问:http://wwww.localhost:${PORT}/${PREFIX}/docs`);
  });
}

bootstrap();
