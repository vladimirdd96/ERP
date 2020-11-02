import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRoles } from './enums/project-roles.enum';
import { ProjectRequestDto } from './dto/project-request.dto';
import { UserRequest } from './interfaces/user-request.interface';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';
import { SDUser } from 'src/users/users.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}

  async createProject(
    project: ProjectRequestDto,
    user: UserRequest,
    ratePerHour: number,
  ): Promise<Project> {
    if (!(user.role in ProjectRoles)) {
      throw new UnauthorizedException(
        'Only Project Manager can create a new project.',
      );
    }
    const newProject = new Project();
    newProject.name = project.name;
    newProject.description = project.description;
    newProject.userId = user.id;
    newProject.contributors = [`${user.email} - ${ratePerHour} - ${user.id}`];
    try {
      await this.projectRepository.save(newProject);
      return newProject;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('This project name is already in use.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUserProjects(user: UserRequest): Promise<Project[]> {
    return await this.projectRepository.find({ userId: user.id });
  }

  async getProjectDetails(
    projectId: number,
    user: UserRequest,
  ): Promise<Project> {
    const project = await this.projectRepository.getProjectTasks(projectId);
    if (project.userId !== user.id) {
      throw new UnauthorizedException(
        'You are allowed to see project details only for projects you have created.',
      );
    }
    return project;
  }

  async addDeveloperToProject(
    projectId: number,
    user: SDUser,
    ratePerHour: number,
    projectOwner: UserRequest,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ id: projectId });
    if (project.userId !== projectOwner.id) {
      throw new UnauthorizedException(
        'You are only allowed to add developer to projects you did create.',
      );
    } else if (
      project.contributors.find(el => el.split(' - ')[0] === user.email)
    ) {
      throw new ConflictException(
        'This developer is already added to this project, please choose another one.',
      );
    }

    project.contributors.push(`${user.email} - ${ratePerHour} - ${user.id}`);
    await this.projectRepository.save(project);
    return project;
  }
}
