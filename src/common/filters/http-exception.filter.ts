import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CodeEnum } from '@src/common/enums';
import { formatDate } from '@src/utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let resultMessage = exception.message;
    let resultCode = CodeEnum.Fail;

    try {
      const { code, message } = JSON.parse(exception.message);
      resultMessage = message;
      resultCode = code;
    } catch (e) {}
    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Time:【${formatDate(Date.now())}】
    Request original url: ${request.originalUrl}
    Params: ${JSON.stringify(request.params)}
    Body: ${JSON.stringify(request.body)}
    Query: ${JSON.stringify(request.query)}
    Url: ${request.url}
    Method: ${request.method}
    IP: ${request.ip}
    Response data:\n ${JSON.stringify(request.data)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
    const errorResponse = {
      status,
      path: request.url, // 错误的url地址
      method: request.method, // 请求方式
      timestamp: new Date().getTime(), // 错误的时间
      data: response.data || null,
      code: resultCode,
      message: resultMessage,
      success: false,
    };
    // 打印日志
    Logger.error(logFormat);
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
