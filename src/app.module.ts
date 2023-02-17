import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  LoggingInterceptor,
  RedisCacheInterceptor,
  RedisLimitInterceptor,
  TransformInterceptor,
} from './common/interceptors';
import { ValidationPipe } from './common/pipes';
import { HttpExceptionFilter } from './common/filters';
import { getConfig } from './utils';
import { SharedModule } from './shared/shared.module';
import { PluginModule } from './plugin/plugin.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    // 配置加载配置文件
    ConfigModule.forRoot({
      ignoreEnvFile: false, // 忽视默认读取.env的文件配置
      isGlobal: true, // 全局注入
      load: [getConfig], // 加载配置文件
    }),
    // mysql的连接
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: String(configService.get('database.type')),
        host: configService.get('database.host'),
        port: parseInt(configService.get('database.port')),
        username: String(configService.get('database.username')),
        password: String(configService.get('database.password')),
        database: String(configService.get('database.database')),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: Boolean(configService.get('database.logging')),
        synchronize: Boolean(configService.get('database.synchronize')), // 同步数据库
        timezone: '+08:00', // 东八区
        cache: {
          duration: 60000, // 1分钟的缓存
        },
        extra: {
          poolMax: 32,
          poolMin: 16,
          queueTimeout: 60000,
          pollPingInterval: 60, // 每隔60秒连接
          pollTimeout: 60, // 连接有效60秒
        },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
    PluginModule,
    ApiModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RedisLimitInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RedisCacheInterceptor,
    },
    // 全局使用管道(数据校验)
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
