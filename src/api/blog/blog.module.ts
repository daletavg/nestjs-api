import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../../database/entities/blog';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../helpers/edit-file-name';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    MulterModule.register({
      storage: diskStorage({
        destination: './storage/blog',
        filename: editFileName,
      }),
    }),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
