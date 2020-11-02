import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../enums/taskStatus.enum';

export class StatusOnlyValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETE,
  ];

  transform(value: TaskStatus) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException('This status is invalid');
    }
    return value;
  }

  private isStatusValid(status: TaskStatus) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
