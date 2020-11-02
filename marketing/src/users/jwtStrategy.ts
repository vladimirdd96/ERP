import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload-interface';
import { MDUser } from './users.entity';
import { UserRepository } from './users.repository';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<MDUser> {
    const { email } = payload;
    const mduser = await this.userRepository.findOne({ email: email });
    if (!mduser) {
      throw new UnauthorizedException();
    }
    return mduser;
  }
}
