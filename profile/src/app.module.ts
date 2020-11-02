import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteService } from '@erp_project/autoregister';
import { Profile } from './profile/profile.entity';
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
      entities: [Profile],
      synchronize: true,
    }),
    ProfileModule,
  ],
  providers: [RouteService],
})
export class AppModule {}
