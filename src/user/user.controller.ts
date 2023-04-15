import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Query,
  HttpCode,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// 接口全局版本控制: http://localhost:3000/v1/接口
@Controller({
  path: 'user',
  version: 'v1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  /* create(@Request() req) {
    console.log(req.body);
    return {
      code: 200,
      message: req.body.name,
    };
  } */
  // 使用 @Body() 装饰器取出req.body
  /* create(@Body() req: { name: string }) {
    console.log(req.name);
    return {
      code: 200,
      message: req.name,
    };
  } */
  // 使用 @Body(param) 装饰器取出指定参数值
  create(@Body('age') age: number) {
    console.log(age);
    return {
      code: 200,
      message: age,
    };
  }

  @Get()
  // 单独控制, 优先级高于接口全局版本控制
  @Version('v2')
  /* findAll(@Request() req) {
    console.log(req);
    return {
      code: 200,
      message: req.query.name,
    };
  } */
  // 使用 @Query() 装饰器取出req.query
  findAll(@Query() req: { name: string }) {
    console.log(req);
    return {
      code: 200,
      message: req.name,
    };
  }

  @Get(':id')
  // 接受多个版本
  @Version(['version1', 'v2', 'v3'])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get(':id')
  /* findId(@Request() req) {
    console.log(req.params.id);
    return {
      code: 200,
      message: req.params.id,
    };
  } */
  // 设置返回状态码
  @HttpCode(500)
  // 使用 @Param() 装饰器取出req.param
  findId(@Param() req, @Headers() headers) {
    console.log(headers);
    return {
      code: 200,
      message: req.id,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
