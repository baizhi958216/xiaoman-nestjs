import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
/* 
  ValidationPipe
  ParseIntPipe
  ParseFloatPipe
  ParseBoolPipe
  ParseArrayPipe
  ParseUUIDPipe
  ParseEnumPipe
  DefaultValuePipe
*/
import { PService } from './p.service';
import { CreatePDto } from './dto/create-p.dto';
import { UpdatePDto } from './dto/update-p.dto';
import * as uuid from 'uuid';
// v1: mac
// v3: 混淆
// v4: 随机数
console.log(uuid.v4());

@Controller('p')
export class PController {
  constructor(private readonly pService: PService) {}

  @Post()
  create(@Body() createPDto: CreatePDto) {
    return this.pService.create(createPDto);
  }

  @Get()
  findAll() {
    return this.pService.findAll();
  }

  @Get(':id')
  // 需要uuid格式
  // 访问 http://localhost:3000/p/1bccf6fd-43cb-4e49-8e51-5d370983db84
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.pService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePDto: UpdatePDto) {
    return this.pService.update(+id, updatePDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pService.remove(+id);
  }
}
