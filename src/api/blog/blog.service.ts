import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../../database/entities/blog';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}
  all(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  find(_id: number): Promise<Blog> {
    return this.blogRepository.findOne({ where: { id: _id } });
  }

  async create(blogData: CreateBlogDto): Promise<Blog> {
    const blog = new Blog();
    blog.title = blogData.title;
    blog.text = blogData.text;
    return await this.blogRepository.save(blog);
  }

  async update(_id: number, blogData: CreateBlogDto): Promise<Blog> {
    const blog = await this.find(_id);
    blog.title = blogData.title;
    blog.text = blogData.text;
    return this.blogRepository.save(blog);
  }
}
