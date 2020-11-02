import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequest } from './interfaces/user-request.interface';
import { UserRepository } from './users.repository';
import { SDUser } from './users.entity';
import { SDRoles } from './enums/roles.enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async addUser(user: UserRequest): Promise<void> {
    if (user.role in SDRoles) {
      const newUser = new SDUser();
      newUser.role = user.role;
      newUser.email = user.email;
      newUser.salary = user.salary;
      await newUser.save();
    }
  }

  async getUserByEmail(userEmail: string): Promise<SDUser> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  async fetchDevelopers() : Promise<SDUser[]> {
    return this.userRepository.find({role: "DEVELOPER"})
  }
}
