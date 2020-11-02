import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { EventPattern, Transport } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Profile } from './profile.entity';
import { ProfileResponse } from './interfaces/profile-response.interface';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @EventPattern('user_registered', Transport.KAFKA)
  async addProfile(data): Promise<void> {
    await this.profileService.addProfile(data.value);
  }

  @Get('users/me')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: Profile): ProfileResponse {
    return this.profileService.getProfile(user);
  }
}
