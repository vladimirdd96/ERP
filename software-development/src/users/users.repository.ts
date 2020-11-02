import { EntityRepository, Repository } from 'typeorm';
import { SDUser } from './users.entity';

@EntityRepository(SDUser)
export class UserRepository extends Repository<SDUser> {}
