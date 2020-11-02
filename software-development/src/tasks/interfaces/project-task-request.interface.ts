import { TaskStatus } from '../enums/taskStatus.enum';

export interface ProjectTaskRequest {
  name: string;
  status: TaskStatus;
  workingHours: number;
}
