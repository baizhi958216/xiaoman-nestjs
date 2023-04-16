import { Controller, Inject, Get } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(
    private readonly demoService: DemoService,
    @Inject('Config') private readonly base: any,
  ) {}

  @Get()
  findAll() {
    return this.base;
  }
}
