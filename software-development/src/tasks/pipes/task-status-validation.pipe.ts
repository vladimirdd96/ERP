import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../enums/taskStatus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException('This status is invalid');
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
