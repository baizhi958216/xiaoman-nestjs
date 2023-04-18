import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe, SetMetadata } from '@nestjs/common';
import * as session from 'express-session';
import * as cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Observable, filter, interval, map } from 'rxjs';
import { rxjsdemo } from './rxjsdemo';
import { ResponseG } from './common/response';
import { HttpFilter } from './common/filter';
import { RoleGuard } from './guard/role/role.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const options = new DocumentBuilder()
    .setTitle('小满的飞机')
    .setDescription('很小')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api-docs', app, document);

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
  // 响应拦截器
  app.useGlobalInterceptors(new ResponseG());
  // 异常拦截器
  app.useGlobalFilters(new HttpFilter());
  // 全局管道验证(返回精简的异常响应)
  app.useGlobalPipes(new ValidationPipe());
  // 全局守卫
  // app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);
}
bootstrap();
