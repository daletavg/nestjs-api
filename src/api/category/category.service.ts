import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../database/entities/category';
import { getManager, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  all(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findMany(_ids: Array<number>): Promise<Category[]> {
    return getManager()
      .createQueryBuilder(Category, 'category')
      .where('category.id IN (:ids)', { ids: _ids })
      .getMany();
  }

  find(_id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id: _id } });
  }

  async create(dataCategory: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.title = dataCategory.title;
    return await this.categoryRepository.save(category);
  }

  async update(
    _id: number,
    dataCategory: CreateCategoryDto,
  ): Promise<Category> {
    const blog = await this.find(_id);
    blog.title = dataCategory.title;
    return this.categoryRepository.save(blog);
  }

  async delete(_id: number): Promise<void> {
    await this.categoryRepository.remove(await this.find(_id));
  }
}
