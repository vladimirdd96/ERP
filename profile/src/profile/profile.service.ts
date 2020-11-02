import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { ProfileResponse } from './interfaces/profile-response.interface';
import { ProfileRequest } from './interfaces/profile-request.interface';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async addProfile(profile: ProfileRequest): Promise<void> {
    const newProfile = new Profile();

    newProfile.profileid = profile.profileId;
    newProfile.fullname = profile.fullname;
    newProfile.bornon = profile.bornon;

    await this.profileRepository.save(newProfile);
  }

  getProfile(profile: Profile): ProfileResponse {
    const { fullname, bornon } = profile;
    return {
      fullname,
      bornon,
    };
  }
}
