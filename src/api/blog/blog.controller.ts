import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blog')
@UseInterceptors(ClassSerializerInterceptor)
export class BlogController {
  constructor(private readonly blogRepository: BlogService) {}

  @UseGuards(JwtAuthGuard)
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
  @UseInterceptors(FileInterceptor('image'))
  store(
    @Body() blogData: CreateBlogDto,
    @UploadedFile() image,
    @Req() request,
  ) {
    return this.blogRepository.create(blogData, image, request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: number,
    @Body() blogData: CreateBlogDto,
    @UploadedFile() image,
  ) {
    return this.blogRepository.update(id, blogData, image);
  }
}
