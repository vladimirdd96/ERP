import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from 'src/enums/taskStatus.enum';
import { TaskRepository } from './campaign-tasks.repository';
import { Task } from './campaign-task.entity';
import { CampaignTaskRequest } from 'src/interfaces/campaign-task-request.interface';
import { UserRequest } from 'src/interfaces/user-request.interface';
import { Roles } from 'src/enums/roles.enum';
import { CampaignsService } from 'src/campaigns/campaigns.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CampaignTasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    private usersService: UsersService,
    private campaignsService: CampaignsService,
  ) {}

  async createNewTask(
    campaignId: number,
    task: CampaignTaskRequest,
    user: UserRequest,
  ): Promise<Task> {
    if (user.role !== Roles.MARKETING_MANAGER) {
      throw new UnauthorizedException(
        'Only Marketing Manager can create new tasks for campaign!',
      );
    }
    const taskExists = await this.taskRepository.findOne({
      where: { campaignId: campaignId, name: task.name },
    });
    if (taskExists) {
      throw new ConflictException(
        'This task name is already in use for this campaign',
      );
    }

    const employee = await this.usersService.getUserById(task.employeeId);
    const campaign = await this.campaignsService.getCampaign(campaignId);
    if (campaign.startDate > task.dueDate || task.dueDate > campaign.endDate) {
      throw new BadRequestException(
        'Task due date must be between campaign start date and end date.',
      );
    }
    const found = campaign.employees.find(e => e === employee.email);
    if (!found) {
      throw new BadRequestException('No such employee available');
    }

    const newTask = new Task();
    newTask.userid = task.employeeId;
    newTask.campaignId = campaignId;
    newTask.name = task.name;
    newTask.description = task.description;
    newTask.status = task.status;
    newTask.dueDate = task.dueDate;
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async getTaskById(
    campaignId: number,
    taskId: number,
    user: UserRequest,
  ): Promise<Task> {
    if (user.role !== Roles.MARKETING_MANAGER && user.role !== Roles.EMPLOYEE) {
      throw new UnauthorizedException(
        'Only Marketing Manager or Employee can view campaign task!',
      );
    }
    const task = await this.taskRepository.findOne({
      where: { campaignId: campaignId, id: taskId },
    });
    if (!task) {
      throw new NotFoundException('No such task found!');
    }
    if (task.userid !== user.id && user.role !== Roles.MARKETING_MANAGER) {
      throw new UnauthorizedException(
        'Only employee assigned to this task can view it or a Marketing Manager!',
      );
    }
    return task;
  }

  async getAllTasksForCampaign(
    campaignId: number,
    user: UserRequest,
  ): Promise<Task[]> {
    if (user.role !== Roles.MARKETING_MANAGER && user.role !== Roles.EMPLOYEE) {
      throw new UnauthorizedException(
        'Only Marketing Manager or Employee can view campaign tasks!',
      );
    }
    const tasks = await this.taskRepository.find({
      where: { campaignId: campaignId },
    });
    if (!tasks) {
      throw new NotFoundException('No tasks found!');
    }
    return tasks;
  }

  async changeTaskStatus(
    campaignId: number,
    taskId: number,
    status: TaskStatus,
    user: UserRequest,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { campaignId: campaignId, id: taskId },
    });
    if (!task) {
      throw new NotFoundException('No such task found!');
    }
    if (user.id !== task.userid) {
      throw new UnauthorizedException(
        'Only Employee assigned to the task can change the status!',
      );
    }
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
