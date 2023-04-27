import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tags } from './entities/tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tags])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
