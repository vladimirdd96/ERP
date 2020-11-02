import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ConfigModule } from '@nestjs/config';
import { ProfileRepository } from './profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    TypeOrmModule.forFeature([ProfileRepository]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class ProfileModule {}
