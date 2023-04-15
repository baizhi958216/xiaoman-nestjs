import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';

@Module({
  imports: [],
  controllers: [AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}
