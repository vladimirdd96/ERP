import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/users/jwtStrategy';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './users.repository';
import * as dotenv from 'dotenv';
import { TaskRepository } from 'src/campaign-tasks/campaign-tasks.repository';

dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, TaskRepository],
  exports: [JwtStrategy, PassportModule, UsersService],
})
export class UsersModule {}
