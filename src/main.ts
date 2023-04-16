import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';

const whileList = ['/demo'];
const blackList = ['/jinitaimei'];

function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  if (blackList.includes(req.originalUrl)) {
    res.send('小黑子露出鸡脚了吧');
  } else {
    next();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启版本控制: http://localhost:3000/版本号/接口
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: false,
  });
  // 全局中间件
  app.use(MiddleWareAll);
  app.use(
    session({
      // 后端session签名(加盐)
      secret: 'XiaoMan',
      // 每次请求时强行设置cookies(会重置过期时间)
      rolling: true,
      // 返回前端cookie名字
      name: 'xiaoman.sid',
      // 返回到前端的cookie key的属性
      cookie: {
        maxAge: 999999,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
