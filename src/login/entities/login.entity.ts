import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Login {
  // 自增id
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column()
  age: number;
}
