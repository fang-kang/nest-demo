import { Logger, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { v4 } from 'uuid';
import { diskStorage } from 'multer';
import { formatDate } from '@src/utils';

@Module({
  imports: [
    MulterModule.register({
      dest: '',
      storage: diskStorage({
        destination: `./public/uploads/${formatDate(new Date(), false)}`,
        filename: (_req: any, file: { originalname: string }, cb: (arg0: any, arg1: string) => any) => {
          console.log(file, 'file');
          const { originalname } = file;
          Logger.log(originalname);
          const index = originalname.lastIndexOf('.');
          const ext = originalname.substring(index + 1, originalname.length);
          // 自定义文件名
          const filename = `${v4().replace(/-/g, '')}.${ext}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
