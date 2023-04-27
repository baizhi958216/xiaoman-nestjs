import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async addTags(params: { tags: string[]; userId: number }) {
    const userInfo = await this.user.findOne({
      where: { id: params.userId },
    });

    const tagList: Tags[] = [];
    for (let index = 0; index < params.tags.length; index++) {
      const T = new Tags();
      T.name = params.tags[index];
      await this.tags.save(T);
      tagList.push(T);
    }

    userInfo.tags = tagList;
    this.user.save(userInfo);

    return true;
  }

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    return this.user.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      relations: ['tags'],
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize, //0 10
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });

    return {
      data,
      total,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
