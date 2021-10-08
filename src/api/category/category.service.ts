import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../database/entities/category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  all(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  find(_id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id: _id } });
  }
}
