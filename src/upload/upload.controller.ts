import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file, 'file');
    return '小满憋不住了';
  }

  @Get('export/:id')
  downLoad(@Param() param, @Res() res: Response) {
    const url = join(__dirname, `../images/${param.id}`);
    res.download(url);
  }

  @Get('stream/:id')
  async down(@Param() param, @Res() res: Response) {
    const url = join(__dirname, `../images/${param.id}`);
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment;filename=${param.id}`);

    tarStream.pipe(res);
  }
}
