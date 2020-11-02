import { Campaign } from 'src/campaigns/campaign.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class Media extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  likes: number;
  @Column()
  comments: number;
  @Column()
  shares: number;
  @Column()
  clicks: number;
  @Column()
  reach: number;
  @Column()
  campaignId: number;
  @ManyToOne(
    type => Campaign,
    campaign => campaign.medias,
  )
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;
}
