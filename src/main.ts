import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启版本控制: http://localhost:3000/版本号/接口
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: false,
  });
  await app.listen(3000);
}
bootstrap();
