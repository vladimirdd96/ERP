import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProjectRepository } from './project.repository';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import * as dotenv from 'dotenv';
import { TasksModule } from 'src/tasks/tasks.module';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    TasksModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ProjectRepository]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [PassportModule, ProjectsService],
})
export class ProjectsModule {}
