import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConnectEvent } from '@nestjs/microservices/external/kafka-options.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/campaign-tasks/campaign-task.entity';
import { TaskRepository } from 'src/campaign-tasks/campaign-tasks.repository';
import { Roles } from 'src/enums/roles.enum';
import { Connection } from 'typeorm';
import { UserRequest } from '../interfaces/user-request.interface';
import { MDUser } from './users.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  private taskRepository: TaskRepository;
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly connection: Connection,
  ) {
    this.taskRepository = this.connection.getCustomRepository(TaskRepository);
  }

  async addUser(user: UserRequest) {
    if (user.role === Roles.MARKETING_MANAGER || user.role === Roles.EMPLOYEE) {
      const newUser = new MDUser();
      newUser.role = user.role;
      newUser.email = user.email;
      newUser.workinghours = 0;
      newUser.salary = user.salary;
      await this.userRepository.save(newUser);
    }
  }

  async getUserById(userId: number): Promise<MDUser> {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new BadRequestException('No such userId found');
    }
    return user;
  }

  async getAllUsers(user: UserRequest): Promise<MDUser[]> {
    if (user.role !== Roles.MARKETING_MANAGER) {
      throw new BadRequestException(
        'Only Marketing Manager could get all users',
      );
    }
    const users = await this.userRepository.find({
      where: { role: Roles.EMPLOYEE },
    });
    return users;
  }

  async getAllUserTasks(user: UserRequest): Promise<Task[]> {
    if (user.role !== Roles.EMPLOYEE) {
      throw new UnauthorizedException('Only Employee can view all his tasks!');
    }
    const tasks = await this.taskRepository.find({ userid: user.id });

    if (!tasks) {
      throw new NotFoundException('No tasks found!');
    }
    return tasks;
  }
}
