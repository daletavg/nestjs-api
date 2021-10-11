import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Category } from './category';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column({ length: 190 })
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => User, (user) => user.blogs)
  @JoinTable()
  user: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
