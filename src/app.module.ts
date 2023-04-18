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
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DemoModule,
    UserModule,
    ConfigModule.forRoot({ path: '/xiaoman' }),
    UploadModule,
    PModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '123456',
      host: 'localhost',
      port: 3306,
      database: 'db',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //扫描包里的实体文件, 推荐使用自动加载实体autoLoadEntities
      synchronize: true, //是否将实体自动同步到数据库
      retryDelay: 500, //重试数据库连接间隔
      retryAttempts: 10, //重试数据库连接次数
      autoLoadEntities: true, //自动加载实体
    }),
  ],
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
