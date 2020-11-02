import { Task } from 'src/tasks/project-task.entity';
import { Project } from 'src/projects/project.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Work } from 'src/tasks/workingHours.entity';

@Entity()
export class SDUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role: string;
  @Column()
  email: string;
  @Column()
  salary: number;
  @OneToMany(
    type => Task,
    task => task.user,
    { eager: false },
  )
  tasks: Task[];
  @OneToMany(
    type => Project,
    project => project.user,
    { eager: false },
  )
  projects: Project[];
  @OneToMany(
    type => Work,
    work => work.user,
  )
  work: Work[];
}
