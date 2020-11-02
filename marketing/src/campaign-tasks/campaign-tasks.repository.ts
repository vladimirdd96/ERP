import { EntityRepository, Repository } from 'typeorm';
import { Task } from './campaign-task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
