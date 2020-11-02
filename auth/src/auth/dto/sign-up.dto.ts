import { Roles, Departments } from '../enums';
import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class SignUpCredentials {
  @IsEmail()
  email: string;
  @MinLength(10)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password is too weak.',
  })
  password: string;
  @IsString()
  @IsNotEmpty()
  jobTitle: string;
  @IsString()
  @IsNotEmpty()
  fullname: string;
  @IsString()
  @IsNotEmpty()
  salary: number;
  @IsNotEmpty()
  bornon: string;
  @IsString()
  @IsNotEmpty()
  role: Roles;
  @IsString()
  @IsNotEmpty()
  department: Departments;
}
