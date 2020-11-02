import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CampaignsRepository } from './campaigns.repository';
import { UsersModule } from 'src/users/users.module';
import { MediaRepository } from 'src/campaigns/media.repository';
@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([CampaignsRepository, MediaRepository]),
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
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [PassportModule, CampaignsService],
})
export class CampaignsModule {}
