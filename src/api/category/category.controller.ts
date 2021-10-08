import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryRepository: CategoryService) {}

  @Get()
  index() {
    return this.categoryRepository.all();
  }

  @Post()
  store() {
    return '';
  }

  @Put(':id')
  update() {
    return '';
  }

  @Delete(':id')
  delete() {
    return '';
  }
}
