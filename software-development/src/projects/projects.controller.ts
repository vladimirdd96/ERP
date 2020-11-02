import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { ProjectRequestDto } from './dto/project-request.dto';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { UserRequest } from './interfaces/user-request.interface';
import { UsersService } from 'src/users/users.service';
import { TasksService } from 'src/tasks/tasks.service';
import { TimeFrameDto } from './dto/time-frame.dto';

@Controller('projects')
@UseGuards(AuthGuard())
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
    private tasksService: TasksService,
  ) {}

  @Post('')
  async addProject(
    @Body() project: ProjectRequestDto,
    @GetUser() user: UserRequest,
    @Body('pmRatePerHour') pmRatePerHour: number,
  ): Promise<Project> {
    const newProject = await this.projectsService.createProject(
      project,
      user,
      pmRatePerHour,
    );
    return newProject;
  }

  @Get('')
  async getUserProjects(@GetUser() user: UserRequest): Promise<Project[]> {
    const userProjects = await this.projectsService.getUserProjects(user);
    return userProjects;
  }

  @Get(':id')
  async getProjectDetails(
    @Param('id') id: number,
    @GetUser() user: UserRequest,
  ): Promise<Project> {
    const project = await this.projectsService.getProjectDetails(id, user);
    return project;
  }

  @Patch(':id/contributors')
  async addDeveloperToProject(
    @GetUser() user: UserRequest,
    @Param('id') projectId: number,
    @Body('user') userEmail: string,
    @Body('ratePerHour') ratePerHour: number,
  ): Promise<Project> {
    const userByEmail = await this.usersService.getUserByEmail(userEmail);
    return await this.projectsService.addDeveloperToProject(
      projectId,
      userByEmail,
      ratePerHour,
      user,
    );
  }

  @Get(':id/project-report')
  async getProjectReport(
    @Param('id') projectId: number,
    @Query() timeFrame: TimeFrameDto,
  ): Promise<{}> {
    const report = await this.tasksService.createReport(projectId, timeFrame);
    return report;
  }

  @Get(':id/financial-report')
  async getFinancialReport(
    @Param('id') projectId: number,
    @Query() timeFrame,
  ): Promise<{}> {
    const report = await this.tasksService.createFinancialReport(
      projectId,
      timeFrame,
    );
    return report;
  }
}
