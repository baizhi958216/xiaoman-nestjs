import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'Config',
      useValue: { baseUrl: '/api' },
    },
  ],
  exports: [
    {
      provide: 'Config',
      useValue: { baseUrl: '/api' },
    },
  ],
})
export class ConfigModule {}
