import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    // 别名注入需要跟模块的提供者别名一致
    @Inject('AppService') private readonly appService: AppService,
    // 使用自定义值将会返回模块提供者定义的值: useValue
    @Inject('Test') private readonly shop: string[],
    // 返回提供者工厂的返回值
    @Inject('CCC') private readonly ccc: number,
    // 使用其它模块
    private readonly UserService: UserService,
  ) {}

  @Get()
  /* getHello(): string {
    return this.appService.getHello();
  } */

  // 自定义提供者返回值
  /* getHello(): string[] {
    return this.shop;
  } */

  // 提供者工厂
  /* getHello(): number {
    return this.ccc;
  } */

  // 使用其它模块
  getHello(): string {
    return this.UserService.findAll();
  }
}
