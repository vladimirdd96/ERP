import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { SignUpCredentials } from './dto/sign-up.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { Departments, Roles } from './enums';
import { UnprocessableEntityException } from '@nestjs/common';
import { trasporter } from './util/mailer';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpCredentials: SignUpCredentials): Promise<User> {
    const dbUsersCount = await this.userRepository.getUserCount();

    const {
      email,
      password,
      jobTitle,
      bornon,
      fullname,
      salary,
      role,
      department,
    } = signUpCredentials;

    const salt = await bcrypt.genSalt();
    const newUser = new User();

    newUser.email = email;
    newUser.password = await this.hashPassword(password, salt);
    newUser.jobTitle = jobTitle;
    newUser.bornon = bornon;
    newUser.fullname = fullname;
    newUser.salary = salary;
    newUser.salt = salt;

    if (dbUsersCount === 0) {
      newUser.role = Roles.ADMIN;
      newUser.department = Departments.ADMIN;
    } else {
      newUser.role = role;
      newUser.department = department;
    }

    if (!(role in Roles) || !(department in Departments)) {
      throw new UnprocessableEntityException('Invalid role or department.');
    }
    try {
      await newUser.save();
      await trasporter
        .sendMail({
          to: email,
          from: 'erp@erp.com',
          subject: 'SignUp completed',
          html: `<h1>Welcome to ERP!</h1>
            <p>Your credentials are:</p>
            <p>Username: <strong>${email}</strong></p>
            <p>Password: <strong>${password}</strong></p>`,
        })
        .catch(err => console.log(err));
      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('This email is already in use.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async createToken(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const user = await this.userRepository.findByEmailAndRawPassword(
      authCredentialsDto,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { id, email, role, department } = user;
    const payload: JwtPayload = { id, email, role, department };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async getUserCount(): Promise<number> {
    return await this.userRepository.getUserCount();
  }
}
