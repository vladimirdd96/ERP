import { PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { SignUpCredentials } from '../dto/sign-up.dto';

export class ParseStringToDate implements PipeTransform {
  transform(value: SignUpCredentials) {
    let date = new Date(value.bornon);
    if (isNaN(date.getDay())) {
      throw new HttpException('Date is not valid', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
