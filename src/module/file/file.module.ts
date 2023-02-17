import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { formatDate } from '@src/utils';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: `./public/uploads/${formatDate(new Date(), false)}`,
        filename: (_req: any, file: { mimetype: string }, cb: (arg0: any, arg1: string) => any) => {
          // 自定义文件名
          const filename = `${v4()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
