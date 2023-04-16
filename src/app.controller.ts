import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // 别名注入需要跟模块的提供者别名一致
    @Inject('AppService') private readonly appService: AppService,
    // 使用自定义值将会返回模块提供者定义的值: useValue
    @Inject('Test') private readonly shop: string[],
  ) {}

  @Get()
  /* getHello(): string {
    return this.appService.getHello();
  } */
  getHello(): string[] {
    return this.shop;
  }
}
