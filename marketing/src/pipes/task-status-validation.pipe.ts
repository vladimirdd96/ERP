import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CampaignTaskRequest } from 'src/interfaces/campaign-task-request.interface';
import { TaskStatus } from '../enums/taskStatus.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.COMPLETE,
  ];

  transform(value: CampaignTaskRequest) {
    if (!this.isStatusValid(value.status)) {
      throw new BadRequestException('This status is invalid');
    }
    return value;
  }

  private isStatusValid(status: TaskStatus) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
