import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload): Promise<Profile> {
    const { id } = payload;
    const profile = await this.profileRepository.findOne({ profileid: id });
    if (!profile) {
      throw new UnauthorizedException();
    }
    return profile;
  }
}
