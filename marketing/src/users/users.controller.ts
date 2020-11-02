import { Controller, Get, UseGuards } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { CampaignTasksService } from 'src/campaign-tasks/campaign-tasks.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserRequest } from 'src/interfaces/user-request.interface';
import { MDUser } from './users.entity';
import { UsersService } from './users.service';

@Controller('mdusers')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @EventPattern('user_registered', Transport.KAFKA)
  async addUser(data): Promise<void> {
    await this.usersService.addUser(data.value);
  }

  @Get('')
  @UseGuards(AuthGuard())
  async getAllUsers(@GetUser() user: UserRequest): Promise<MDUser[]> {
    return await this.usersService.getAllUsers(user);
  }

  @Get('me/tasks')
  @UseGuards(AuthGuard())
  async getAllUserTasks(@GetUser() user: UserRequest) {
    return this.usersService.getAllUserTasks(user);
  }
}
