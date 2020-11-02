import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { InjectRepository } from '@nestjs/typeorm';
import { SDUser } from './users.entity';
import { UserRepository } from './users.repository';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload): Promise<SDUser> {
    const { email } = payload;
    const sduser = await this.userRepository.findOne({ email: email });
    if (!sduser) {
      throw new UnauthorizedException();
    }
    return sduser;
  }
}
