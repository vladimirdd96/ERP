import { Campaign } from './campaign.model';

export interface CampaignTask {
  id: number;
  name: string;
  description: string;
  status: string;
  dueDate: Date;
  campaignId: number;
  userid: number;
  campaign: Campaign;
}
