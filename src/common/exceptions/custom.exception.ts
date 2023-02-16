import { HttpException, HttpStatus } from '@nestjs/common';
import { CodeEnum } from '@src/common/enums';

export class CustomException extends HttpException {
  constructor(message: string, code = CodeEnum.Fail) {
    super({ message, code }, HttpStatus.OK);
  }
}
