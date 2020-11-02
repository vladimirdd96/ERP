import { PipeTransform, HttpException, HttpStatus } from '@nestjs/common';
import { CampaignTaskRequest } from 'src/interfaces/campaign-task-request.interface';

export class TaskDateParse implements PipeTransform {
  transform(value: CampaignTaskRequest) {
    let dueDate = new Date(value.dueDate);
    if (isNaN(dueDate.getDay())) {
      throw new HttpException('Date is not valid', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
