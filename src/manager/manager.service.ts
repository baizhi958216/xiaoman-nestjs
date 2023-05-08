import { Injectable } from '@nestjs/common';
import { CreateManagerDto, transferMoneyDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager) private readonly money: Repository<Manager>,
  ) {}
  create(createManagerDto: CreateManagerDto) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }

  async transferMoney(transferMoneyDto: transferMoneyDto) {
    try {
      return this.money.manager.transaction(async (manager) => {
        let from = await this.money.findOne({
          where: { id: transferMoneyDto.fromId },
        });
        let to = await this.money.findOne({
          where: { id: transferMoneyDto.toId },
        });
        if (from.money >= transferMoneyDto.money) {
          // 事务
          manager.save(Manager, {
            id: from.id,
            money: from.money - transferMoneyDto.money,
          });
          manager.save(Manager, {
            id: to.id,
            money: to.money + transferMoneyDto.money,
          });
          return {
            message: '转载成功',
          };
        } else {
          return {
            message: '余额不足',
          };
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
