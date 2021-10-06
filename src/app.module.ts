import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './api/blog/blog.module';
import { Connection } from 'typeorm';
import { Blog } from "./database/entities/blog";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'meta',
      database: 'nest_blog',
      entities: [Blog],
      synchronize: true,
    }),
    BlogModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
