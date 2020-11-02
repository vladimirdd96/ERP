import { Media } from './media.model';
import { CampaignTaskDto } from './campaign-task.dto';
export interface Campaign {
  id: number;
  name: string;
  target: string;
  startDate: Date;
  endDate: Date;
  employees: string[];
  userId: number;
  tasks: CampaignTaskDto[];
  media: Media[];
}
