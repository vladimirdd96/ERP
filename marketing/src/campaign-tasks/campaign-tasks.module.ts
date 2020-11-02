import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { UsersModule } from 'src/users/users.module';
import { CampaignTasksController } from './campaign-tasks.controller';
import { TaskRepository } from './campaign-tasks.repository';
import { CampaignTasksService } from './campaign-tasks.service';

@Module({
  imports: [
    UsersModule,
    CampaignsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([TaskRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [CampaignTasksController],
  providers: [CampaignTasksService],
  exports: [PassportModule, CampaignTasksService],
})
export class CampaignTasksModule {}
