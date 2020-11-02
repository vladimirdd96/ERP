import { EntityRepository, Repository } from 'typeorm';
import { Task } from './project-task.entity';
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  constructor() {
    super();
  }

  async getProjectTasks(projectId: number): Promise<{}> {
    const tasks = await this.createQueryBuilder('task')
      .leftJoinAndSelect('task.projectId', 'project')
      .leftJoinAndSelect('task.user', 'sduser')
      .where('task.projectId = :id', { id: projectId })
      .getMany();
    return tasks;
  }

  async isExistingTaskInProject(projectId: number, name: string): Promise<{}> {
    const task = await this.find({
      where: { projectId: projectId, name: name },
    });
    return task;
  }
}
