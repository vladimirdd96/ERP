import { EntityRepository, Repository } from 'typeorm';
import { MDUser } from './users.entity';

@EntityRepository(MDUser)
export class UserRepository extends Repository<MDUser> {
  constructor() {
    super();
  }
}
