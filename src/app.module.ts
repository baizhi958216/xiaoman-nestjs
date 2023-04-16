import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DemoModule, UserModule],
  controllers: [AppController, DemoController],
  providers: [
    {
      provide: 'AppService',
      useClass: AppService,
    },
    {
      provide: 'Test',
      // 自定义值
      useValue: ['TB', 'PDD', 'JD'],
    },
    DemoService,
  ],
})
export class AppModule {}
