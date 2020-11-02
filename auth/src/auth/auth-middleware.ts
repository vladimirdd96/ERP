import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtTokenCheck implements NestMiddleware {
  isValid = null;
  decode = null;
  cleanToken = null;
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getDBUsersCount(): Promise<number> {
    const users = await this.userRepository.getUserCount();
    return users;
  }

  async use(req: Request, res: Response, next: Function) {
    const token = req.headers['authorization'];
    if (await this.getDBUsersCount()) {
      if (token) {
        this.cleanToken = token.replace('Bearer', '').trim();
        this.decode = this.jwtService.decode(this.cleanToken);

        if (this.decode.role !== 'Admin') {
          throw new UnauthorizedException('Only admin can add new user');
        }
      } else {
        throw new UnauthorizedException(
          'You must be logged in with admin account to create new user',
        );
      }
    }

    next();
  }
}
