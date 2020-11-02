import { EntityRepository, Repository } from 'typeorm';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  constructor() {
    super();
  }

  async getProjectTasks(projectId: number): Promise<Project> {
    const projectTasks = await this.createQueryBuilder('p')
      .leftJoinAndSelect('p.tasks', 'task')
      .where('p.id = :id', { id: projectId })
      .getOne();

    return projectTasks;
  }
}
