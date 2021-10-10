import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryRepository: CategoryService) {}

  @Get()
  index() {
    return this.categoryRepository.all();
  }

  @Post()
  store(@Body() categoryData: CreateCategoryDto) {
    return this.categoryRepository.create(categoryData);
  }

  @Put(':id')
  update(@Param('id') _id: number, @Body() categoryData: CreateCategoryDto) {
    return this.categoryRepository.update(_id, categoryData);
  }

  @Delete(':id')
  delete(@Param('id') _id: number) {
    this.categoryRepository.delete(_id);
    return { success: true };
  }
}
