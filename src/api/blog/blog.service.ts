import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../../database/entities/blog';
import { CreateBlogDto } from './dto/create-blog.dto';
import { deleteFile, checkExist } from '../../helpers/delete-file';
import { UserService } from '../user/user.service';
import { User } from '../../database/entities/user';
import { CategoryService } from '../category/category.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private userRepository: UserService,
    private categoryRepository: CategoryService,
  ) {}
  all(): Promise<Blog[]> {
    return this.blogRepository.find({
      relations: ['user', 'categories'],
    });
  }

  find(_id: number): Promise<Blog> {
    return this.blogRepository.findOne({ where: { id: _id } });
  }

  async create(
    blogData: CreateBlogDto,
    image: any,
    userData: any,
  ): Promise<Blog> {
    const blog = new Blog();
    blog.title = blogData.title;
    blog.text = blogData.text;
    if (image) {
      blog.image = image.path;
    }
    const user = await this.userRepository.find(userData.sub);
    const categories = await this.categoryRepository.findMany(
      blogData.categoryIds,
    );
    if (categories.length) {
      blog.categories = categories;
      // for (const key in categories) {
      //   blog.categories.push(categories[key]);
      // }
    }
    if (user) {
      blog.user = user;
    }
    return await this.blogRepository.save(blog);
  }

  async update(
    _id: number,
    blogData: CreateBlogDto,
    image: any,
  ): Promise<Blog> {
    const blog = await this.find(_id);
    blog.title = blogData.title;
    blog.text = blogData.text;
    if (image) {
      if (checkExist(blog.image)) {
        deleteFile(blog.image);
      }
      blog.image = image.path;
    }
    const categories = await this.categoryRepository.findMany(
      blogData.categoryIds,
    );
    if (categories.length) {
      blog.categories = categories;
    }
    return this.blogRepository.save(blog);
  }
}
