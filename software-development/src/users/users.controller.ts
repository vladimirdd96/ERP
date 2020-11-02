import { Controller, Get, UseGuards } from '@nestjs/common';
import { EventPattern, Transport } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { SDUser } from './users.entity';
import { UsersService } from './users.service';

@Controller('sdusers')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @EventPattern('user_registered', Transport.KAFKA)
  async addUser(data): Promise<void> {
    await this.usersService.addUser(data.value);
  }

  @Get('')
  @UseGuards(AuthGuard())
  async getDevelopers(@GetUser() user): Promise<SDUser[]> {
    return await this.usersService.fetchDevelopers();
  }
}
