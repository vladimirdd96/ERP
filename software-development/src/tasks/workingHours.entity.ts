import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/project-task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SDUser } from '../users/users.entity';

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  workinghours: number;
  @Column('timestamp')
  createdAt: Date;
  @Column()
  userId: number;
  @ManyToOne(
    type => SDUser,
    sduser => sduser.work,
  )
  @JoinColumn({ name: 'userId' })
  user: SDUser;
  @Column()
  projectId: number;
  @ManyToOne(
    type => Project,
    project => project.work,
  )
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column()
  taskId: number;
  @ManyToOne(
    type => Task,
    task => task.work,
  )
  @JoinColumn({ name: 'taskId' })
  task: Task;
}
