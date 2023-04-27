import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @Column({ type: 'text' })
  desc: string;

  @OneToMany(() => Tags, (tags) => tags.user)
  tags: Tags[];
}
