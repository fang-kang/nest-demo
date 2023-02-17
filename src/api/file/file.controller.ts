import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file.dto';

@ApiTags('文件上传')
@Controller('file')
export class FileController {
  constructor(private readonly configService: ConfigService) {}

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '文件上传',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '选择文件',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFile(@UploadedFile() file: any): Promise<string> {
    const baseUrl = this.configService.get('baseUrl');
    const url = baseUrl + file.path;
    return url;
  }
}
