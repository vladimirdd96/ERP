import { Campaign } from 'src/campaigns/campaign.entity';
import { MDUser } from 'src/users/users.entity';
import { TaskStatus } from '../enums/taskStatus.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
  @Column()
  dueDate: Date;
  @Column()
  campaignId: number;
  @ManyToOne(
    type => Campaign,
    campaign => campaign.tasks,
    { eager: true },
  )
  @JoinColumn({ name: 'campaignId' })
  campaign: Campaign;
  @Column()
  userid: number;
  @ManyToOne(
    type => MDUser,
    mduser => mduser.tasks,
  )
  @JoinColumn({ name: 'userId' })
  user: MDUser;
}
