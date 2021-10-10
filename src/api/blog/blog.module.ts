import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../../database/entities/blog';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../helpers/edit-file-name';
import { UserModule } from '../user/user.module';
import { User } from '../../database/entities/user';
import { UserService } from '../user/user.service';
import { Category } from '../../database/entities/category';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, User, Category]),
    MulterModule.register({
      storage: diskStorage({
        destination: './storage/blog',
        filename: editFileName,
      }),
    }),
  ],
  providers: [BlogService, UserService, CategoryService],
  controllers: [BlogController],
})
export class BlogModule {}
