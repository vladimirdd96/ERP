import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor() {
    super();
  }

  async getUserCount(): Promise<number> {
    const query = this.createQueryBuilder();
    const userCount = await query.getCount();
    return userCount;
  }

  async findByEmailAndRawPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    }
    return null;
  }
}
