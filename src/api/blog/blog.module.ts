import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../../database/entities/blog';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
