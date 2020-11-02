import { EntityRepository, Repository } from 'typeorm';
import { Campaign } from './campaign.entity';

@EntityRepository(Campaign)
export class CampaignsRepository extends Repository<Campaign> {}
