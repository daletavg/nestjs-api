import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogRepository: BlogService) {}

  @Get()
  index() {
    return this.blogRepository.all();
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.blogRepository.find(id);
  }

  @Post()
  store(@Body() blogData: CreateBlogDto) {
    return this.blogRepository.create(blogData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() blogData: CreateBlogDto) {
    console.log(id);
    return this.blogRepository.update(id, blogData);
  }
}
