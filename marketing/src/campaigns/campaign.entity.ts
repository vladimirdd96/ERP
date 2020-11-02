import { Task } from 'src/campaign-tasks/campaign-task.entity';
import { Media } from 'src/campaigns/media.entity';
import { MDUser } from 'src/users/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Campaign extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  target: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column('varchar', { array: true })
  employees: string[];
  @OneToMany(
    type => Task,
    task => task.campaign,
  )
  tasks: Task[];
  @Column()
  userId: number;
  @ManyToOne(
    type => MDUser,
    mduser => mduser.campaigns,
  )
  @JoinTable({ name: 'userId' })
  user: MDUser;
  @OneToMany(
    type => Media,
    media => media.campaign,
  )
  medias: Media[];
}
