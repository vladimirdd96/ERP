import { Project } from 'src/projects/project.entity';
import { SDUser } from 'src/users/users.entity';
import { Work } from './workingHours.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
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
  status: string;
  @OneToMany(
    type => Work,
    work => work.task,
  )
  work: Work[];
  @Column()
  projectId: number;
  @ManyToOne(
    type => Project,
    project => project.tasks,
    { eager: true },
  )
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column()
  userId: number;
  @ManyToOne(
    type => SDUser,
    sduser => sduser.tasks,
    { eager: false },
  )
  @JoinColumn({ name: 'userId' })
  user: SDUser;
}
