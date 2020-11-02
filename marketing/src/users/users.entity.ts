import { Task } from 'src/campaign-tasks/campaign-task.entity';
import { Campaign } from 'src/campaigns/campaign.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MDUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role: string;
  @Column()
  email: string;
  @Column()
  salary: string;
  @Column()
  workinghours: number;
  @OneToMany(
    type => Task,
    task => task.user,
  )
  tasks: Task[];
  @OneToMany(
    type => Campaign,
    campaign => campaign.user,
  )
  campaigns: Campaign[];
}
