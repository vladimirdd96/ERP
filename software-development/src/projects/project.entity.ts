import { Task } from 'src/tasks/project-task.entity';
import { SDUser } from 'src/users/users.entity';
import { Work } from '../tasks/workingHours.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column('varchar', { array: true })
  contributors: string[];
  @Column()
  description: string;
  @Column()
  userId: number;
  @OneToMany(
    type => Task,
    task => task.project,
    { eager: false },
  )
  tasks: Task[];
  @OneToMany(
    type => Work,
    work => work.project,
  )
  work: Work[];
  @ManyToOne(
    type => SDUser,
    sduser => sduser.projects,
    { eager: false },
  )
  @JoinColumn({ name: 'userId' })
  user: SDUser;
}
