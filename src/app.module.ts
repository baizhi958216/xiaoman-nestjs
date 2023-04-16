import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { AppService2 } from './app.service2';

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
    // 工厂模式
    AppService2,
    {
      provide: 'CCC',
      inject: [AppService2],
      useFactory(AppService2: AppService2) {
        console.log(AppService2.getHello());
        return 123;
      },
    },
    DemoService,
  ],
})
export class AppModule {}
