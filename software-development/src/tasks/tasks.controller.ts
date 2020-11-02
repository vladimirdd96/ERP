import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user.decorator';
import { TrackSheet } from 'src/tasks/interfaces/track-sheet.interface';
import { UserRequest } from 'src/users/interfaces/user-request.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/taskStatus.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './project-task.entity';
import { TasksService } from './tasks.service';
import { TrackTimeDto } from './dto/track-time.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('')
  async createNewProjectTask(@Body() taskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskService.createNewTask(taskDto);
    return task;
  }

  @Get('')
  async getUserTasks(@GetUser() user: UserRequest): Promise<Task[]> {
    const userProjects = await this.taskService.getUserTasks(user);
    return userProjects;
  }

  @Get(':id')
  async getTaskDetails(@Param('id') taskId: number): Promise<Task> {
    const task = await this.taskService.getTaskById(taskId);
    return task;
  }

  @Patch(':id/status')
  async changeTaskStatus(
    @GetUser() user: UserRequest,
    @Param('id') taskId: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    const modifiedTask = await this.taskService.changeTaskStatus(
      taskId,
      status,
      user,
    );
    return modifiedTask;
  }

  @Patch(':id/work')
  @UseGuards(AuthGuard())
  async trackWorkingHours(
    @Param('id') taskId: number,
    @GetUser() user: UserRequest,
    @Body() trackTimeDto: TrackTimeDto,
  ): Promise<TrackSheet> {
    return await this.taskService.addWorkingHours(user, taskId, trackTimeDto);
  }
}
