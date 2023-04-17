import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);

    const errors = await validate(DTO);

    if (errors.length) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }

    console.log(errors);

    console.log(DTO);

    return value;
  }
}
