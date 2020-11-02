import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { CampaignTasksModule } from './campaign-tasks/campaign-tasks.module';
import { RouteService } from '@erp_project/autoregister';
import { MDUser } from './users/users.entity';
import { Campaign } from './campaigns/campaign.entity';
import { Task } from './campaign-tasks/campaign-task.entity';
import { Media } from './campaigns/media.entity';
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
      entities: [MDUser, Campaign, Task, Media],
      synchronize: true,
    }),
    UsersModule,
    CampaignsModule,
    CampaignTasksModule,
  ],
  providers: [RouteService],
})
export class AppModule {}
