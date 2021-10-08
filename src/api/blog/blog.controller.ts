import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blog')
@UseInterceptors(ClassSerializerInterceptor)
export class BlogController {
  constructor(private readonly blogRepository: BlogService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  index() {
    return this.blogRepository.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  show(@Param('id') id: number) {
    return this.blogRepository.find(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  store(@Body() blogData: CreateBlogDto) {
    return this.blogRepository.create(blogData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() blogData: CreateBlogDto) {
    console.log(id);
    return this.blogRepository.update(id, blogData);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() image) {
    const response = {
      originalname: image.originalname,
      filename: image.filename,
    };
    return response;
  }
}
