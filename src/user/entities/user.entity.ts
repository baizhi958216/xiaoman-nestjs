import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    // 查询时被过滤
    select: true,
    comment: '注释',
    default: 213,
    nullable: true,
  })
  password: string;

  // 自动生成uuid
  @Generated('uuid')
  uuid: string;

  // 自动生成时间戳
  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  // 枚举
  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 1,
  })
  xiaoman: number;

  // 数组
  @Column('simple-array')
  names: string[];

  // json
  @Column('simple-json')
  json: {
    name: string;
    age: number;
  };
}
