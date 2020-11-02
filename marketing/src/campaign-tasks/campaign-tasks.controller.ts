import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskStatus } from 'src/enums/taskStatus.enum';
import { TaskStatusValidationPipe } from 'src/pipes/task-status-validation.pipe';
import { CampaignTasksService } from './campaign-tasks.service';
import { Task } from './campaign-task.entity';
import { CampaignTaskRequest } from 'src/interfaces/campaign-task-request.interface';
import { TaskDateParse } from 'src/pipes/task-date.pipe';
import { UserRequest } from 'src/interfaces/user-request.interface';
import { GetUser } from 'src/decorators/get-user.decorator';
import { StatusOnlyValidationPipe } from 'src/pipes/status-only-validation.pipe';

@Controller()
export class CampaignTasksController {
  constructor(private taskService: CampaignTasksService) {}

  @Post('campaigns/:campaignId/tasks')
  @UseGuards(AuthGuard())
  async createNewCampaignTask(
    @Param('campaignId') campaignId: number,
    @Body(TaskDateParse, TaskStatusValidationPipe) task: CampaignTaskRequest,
    @GetUser() user: UserRequest,
  ): Promise<Task> {
    return await this.taskService.createNewTask(campaignId, task, user);
  }
  @Get('campaigns/:campaignId/tasks')
  @UseGuards(AuthGuard())
  async getAllTasksForCampaign(
    @Param('campaignId') campaignId: number,
    @GetUser() user: UserRequest,
  ): Promise<Task[]> {
    return await this.taskService.getAllTasksForCampaign(campaignId, user);
  }

  @Get('campaigns/:campaignId/tasks/:taskId')
  @UseGuards(AuthGuard())
  async getTaskDetails(
    @Param('campaignId') campaignId: number,
    @Param('taskId') taskId: number,
    @GetUser() user: UserRequest,
  ): Promise<Task> {
    const task = await this.taskService.getTaskById(campaignId, taskId, user);
    return task;
  }

  @Patch('campaigns/:campaignId/tasks/:taskId')
  @UseGuards(AuthGuard())
  async changeTaskStatus(
    @Param('campaignId') campaignId: number,
    @Param('taskId') taskId: number,
    @Body('status', StatusOnlyValidationPipe) status: TaskStatus,
    @GetUser() user: UserRequest,
  ): Promise<Task> {
    const modifiedTask = await this.taskService.changeTaskStatus(
      campaignId,
      taskId,
      status,
      user,
    );
    return modifiedTask;
  }
}
