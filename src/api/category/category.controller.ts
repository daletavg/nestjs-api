import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryRepository: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index() {
    return this.categoryRepository.all();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  store(@Body() categoryData: CreateCategoryDto) {
    return this.categoryRepository.create(categoryData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') _id: number, @Body() categoryData: CreateCategoryDto) {
    return this.categoryRepository.update(_id, categoryData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') _id: number) {
    this.categoryRepository.delete(_id);
    return { success: true };
  }
}
