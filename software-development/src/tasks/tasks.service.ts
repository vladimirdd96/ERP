import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequest } from 'src/users/interfaces/user-request.interface';
import { UserFinancialReport } from 'src/users/userFinancialReport';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/taskStatus.enum';
import { Task } from './project-task.entity';
import { TaskRepository } from './project-task.repository';
import { milisecondsToDayNumber } from './util/milisecondsToDayNumber';
import { Work } from './workingHours.entity';
import { WorkingHoursRepository } from './workingHours.repository';
import { TimeFrameDto } from 'src/projects/dto/time-frame.dto';
import { TrackTimeDto } from './dto/track-time.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
    @InjectRepository(WorkingHoursRepository)
    private workingHoursRepository: WorkingHoursRepository,
  ) {}

  async createNewTask(taskDto: CreateTaskDto): Promise<Task> {
    const isExistingTask = await this.taskRepository.isExistingTaskInProject(
      taskDto.projectId,
      taskDto.name,
    );

    if (Object.keys(isExistingTask).length !== 0) {
      throw new ConflictException(
        'This task name is already in use for this project',
      );
    }

    const newTask = new Task();
    newTask.userId = taskDto.devId;
    newTask.projectId = taskDto.projectId;
    newTask.name = taskDto.name;
    newTask.description = taskDto.description;
    newTask.status = taskDto.status;
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async getUserTasks(user: UserRequest): Promise<Task[]> {
    return await this.taskRepository.find({ userId: user.id });
  }

  async getTaskById(taskId: number): Promise<Task> {
    return await this.taskRepository.findOne({ id: taskId });
  }

  async changeTaskStatus(
    taskId: number,
    status: TaskStatus,
    user: UserRequest,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ id: taskId });
    if (task.userId !== user.id) {
      throw new BadRequestException(
        "Task status can be changed only by task's assignee.",
      );
    }
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async addWorkingHours(
    user: UserRequest,
    taskId: number,
    trackTimeDto: TrackTimeDto,
  ): Promise<Work> {
    if (+trackTimeDto.time < 1) {
      throw new BadRequestException(
        'You must enter a number that is bigger than 0',
      );
    }
    const task = await this.taskRepository.findOne({ id: taskId });
    if (task.userId !== user.id) {
      throw new BadRequestException(
        'You can only track time for tasks you are assinged on.',
      );
    }
    if (task.status === TaskStatus.COMPLETE) {
      throw new BadRequestException(
        'You cannot track time for task which has been completed.',
      );
    } else if (task.status === TaskStatus.OPEN) {
      throw new BadRequestException(
        'Task must be in IN_PROGRESS status in order to track time.',
      );
    }
    const newTrackSheet = new Work();
    newTrackSheet.userId = user.id;
    newTrackSheet.workinghours = +trackTimeDto.time;
    newTrackSheet.projectId = trackTimeDto.projectId;
    newTrackSheet.taskId = taskId;
    newTrackSheet.createdAt = trackTimeDto.createdAt;
    await this.workingHoursRepository.save(newTrackSheet);
    return newTrackSheet;
  }

  async createReport(
    projectId: number,
    timeFrameDto: TimeFrameDto,
  ): Promise<{}> {
    if (timeFrameDto.startTime > timeFrameDto.endTime) {
      throw new BadRequestException('Start time must be before end time!');
    }
    const projectTrackSheet = await this.workingHoursRepository.getFullTrackSheetForProject(
      projectId,
      timeFrameDto.startTime,
      timeFrameDto.endTime,
    );

    if (Object.keys(projectTrackSheet).length === 0) {
      throw new BadRequestException('No records for this time period.');
    }
    try {
      // const reportt : TrackSheet = {}

      const report = new Map();

      for (const reportCard of Object.values(projectTrackSheet)) {
        if (!report.has(reportCard['user']['email'])) {
          report.set(reportCard['user']['email'], []);
        }
        const existingReport = report.get(reportCard['user']['email']);
        const existingTask = existingReport.find(
          el =>
            el.taskNameAndStatus ===
            `${reportCard['task']['name']}(${reportCard['task']['status']})`,
        );
        if (existingTask) {
          existingTask.workingHours =
            +existingTask.workingHours + +reportCard['workinghours'];
        } else {
          existingReport.push({
            taskNameAndStatus: `${reportCard['task']['name']}(${reportCard['task']['status']})`,
            workingHours: reportCard['workinghours'],
          });
        }
        report.set(reportCard['user']['email'], existingReport);
      }
      return [...report.entries()].reduce(
        (obj, [key, value]) => ((obj[key] = value), obj),
        {},
      );
    } catch (error) {
      throw new BadRequestException(
        'No track sheets for this time frame. Please select another time frame.',
      );
    }
  }

  async createFinancialReport(
    projectId: number,
    timeFrameDto: TimeFrameDto,
  ): Promise<{}> {
    if (timeFrameDto.startTime > timeFrameDto.endTime) {
      throw new BadRequestException('Start time must be before end time!');
    }
    try {
      const projectTrackSheet = await this.workingHoursRepository.getFullTrackSheetForProject(
        projectId,
        timeFrameDto.startTime,
        timeFrameDto.endTime,
      );
      const reportDayCount = milisecondsToDayNumber(
        Math.abs(
          new Date(timeFrameDto.endTime).getTime() -
            new Date(timeFrameDto.startTime).getTime(),
        ),
      );
      const financialReport = new Map();
      const userRatePerHour = {};

      Object.values(projectTrackSheet)[0]['project']['contributors'].forEach(
        element => {
          const [email, ratePerHour, salary] = element.split(' - ');
          userRatePerHour[email] = +ratePerHour;
        },
      );

      for (const reportCard of Object.values(projectTrackSheet)) {
        if (!financialReport.has(reportCard['user']['email'])) {
          financialReport.set(reportCard['user']['email'], []);
        }
        const existingReport = financialReport.get(reportCard['user']['email']);
        if (existingReport.length !== 0) {
          existingReport[0].workingHours += +reportCard['workinghours'];
        } else {
          existingReport.push(
            new UserFinancialReport(
              userRatePerHour[reportCard['user']['email']],
              Number(reportCard['user']['salary']) / 23 / 8,
              reportDayCount,
              +reportCard['workinghours'],
            ),
          );
        }
        financialReport.set(reportCard['user']['email'], existingReport);
      }
      return [...financialReport.entries()].reduce(
        (obj, [key, value]) => ((obj[key] = value), obj),
        {},
      );
    } catch (error) {
      throw new BadRequestException(
        'No track sheets for this time frame. Please select another time frame.',
      );
    }
  }
}
