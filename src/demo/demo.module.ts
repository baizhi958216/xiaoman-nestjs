import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { Logger } from 'src/middleware';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 普通写法
    /* 
    consumer.apply(Logger).forRoutes('demo'); 
    */
    // 只拦截GET
    /* 
    consumer.apply(Logger).forRoutes({
        path: 'user',
        method: RequestMethod.GET,
    }); 
    */
    // 整个控制器
    consumer.apply(Logger).forRoutes(DemoController);
  }
}
