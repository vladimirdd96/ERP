import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './project-task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import * as dotenv from 'dotenv';
import { WorkingHoursRepository } from './workingHours.repository';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository, WorkingHoursRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [PassportModule, TasksService],
})
export class TasksModule {}
