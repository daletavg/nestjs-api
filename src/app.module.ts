import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './api/blog/blog.module';
import { Connection } from 'typeorm';
import { Blog } from "./database/entities/blog";
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { User } from "./database/entities/user";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'meta',
      database: 'nest_blog',
      entities: [Blog, User],
      synchronize: true,
    }),
    BlogModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
