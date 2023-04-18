import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 通过反射拿到路由的Metadata key
    const admin = this.Reflector.get<string[]>('role', context.getHandler());
    const req = context.switchToHttp().getRequest<Request>();
    // 请求包含admin则通过
    // http://localhost:3000/guard?role=admin
    if (admin.includes(req.query.role as string)) {
      console.log('经过了守卫', admin);
      return true;
    } else {
      return false;
    }
  }
}
