import { TaskStatus } from 'src/enums/taskStatus.enum';

export interface CampaignTaskRequest {
  employeeId: number;
  name: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
}
