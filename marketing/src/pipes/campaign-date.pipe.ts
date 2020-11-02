import { PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { CampaignRequest } from 'src/interfaces/campaign-request.interface';

export class CampaignDateParse implements PipeTransform {
  transform(value: CampaignRequest) {
    let startDate = new Date(value.startDate);
    let endDate = new Date(value.endDate);
    if (isNaN(startDate.getDay()) || isNaN(endDate.getDay())) {
      throw new HttpException('Date is not valid', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
