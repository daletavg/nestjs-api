import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './api/blog/blog.module';
import { Connection } from 'typeorm';
import { Blog } from './database/entities/blog';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { User } from './database/entities/user';
import { AppController } from './app.controller';
import { CategoryModule } from './api/category/category.module';
import { Category } from './database/entities/category';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'dashboard',
      entities: [Blog, User, Category],
      synchronize: true,
    }),
    BlogModule,
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
