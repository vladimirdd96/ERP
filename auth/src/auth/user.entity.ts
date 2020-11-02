import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { Departments, Roles } from './enums';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  jobTitle: string;
  @Column()
  department: Departments;
  @Column()
  fullname: string;
  @Column()
  salary: number;
  @Column()
  bornon: string;
  @Column()
  role: Roles;
  @Column()
  password: string;
  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
