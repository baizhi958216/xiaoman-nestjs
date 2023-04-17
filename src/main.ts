import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Observable, filter, interval, map } from 'rxjs';
import { rxjsdemo } from './rxjsdemo';

const whileList = ['/demo'];
const blackList = ['/jinitaimei'];

function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  if (blackList.includes(req.originalUrl)) {
    res.send({
      message: '小黑子露出鸡脚了吧',
    });
  } else {
    next();
  }
}

async function bootstrap() {
  // rxjs
  // rxjsdemo();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源目录访问
  app.useStaticAssets(join(__dirname, 'images'), {
    // 添加前缀 https://localhost:3000/xiaoman/xxxxxx
    prefix: '/xiaoman',
  });
  // 开启版本控制: http://localhost:3000/版本号/接口
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: false,
  });
  // 全局中间件
  app.use(MiddleWareAll);
  // 跨域处理
  app.use(cors());
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
