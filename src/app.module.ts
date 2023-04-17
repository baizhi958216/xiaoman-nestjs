import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { AppService2 } from './app.service2';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [DemoModule, UserModule, ConfigModule.forRoot({ path: '/xiaoman' }), UploadModule, PModule, LoginModule],
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
      async useFactory(AppService2: AppService2) {
        return await new Promise((r) => {
          setTimeout(() => {
            r(AppService2.getHello());
          }, 0);
        });
      },
    },
    DemoService,
  ],
})
export class AppModule {}
