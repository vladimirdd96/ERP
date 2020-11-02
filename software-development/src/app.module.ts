import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SDUser } from './users/users.entity';
import { Project } from './projects/project.entity';
import { Task } from './tasks/project-task.entity';
import { RouteService } from '@erp_project/autoregister';
import { Work } from './tasks/workingHours.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.DB_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [SDUser, Project, Task, Work],
      synchronize: true,
    }),
    UsersModule,
    ProjectsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [RouteService],
})
export class AppModule {}
