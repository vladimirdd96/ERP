import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Res,
  Inject,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { SignUpCredentials } from './dto/sign-up.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ClientKafka } from '@nestjs/microservices';
import { TopicPayload } from './payloads/topic-payload';
import { UserRegistered } from './payloads/user-registered';
import { ParseStringToDate } from './pipes/ParseDatePipe';

@Controller('api')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly client: ClientKafka,
    private authService: AuthService,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Post('users')
  async signUp(
    @Body(ParseStringToDate, ValidationPipe)
    signUpCredentials: SignUpCredentials,
  ): Promise<User> {
    const payload = await this.authService.signUp(signUpCredentials);
    this.send(
      new UserRegistered(
        payload.fullname,
        payload.bornon.toString(),
        payload.id,
        payload.email,
        payload.role,
        payload.salary,
      ),
    );
    return payload;
  }

  @Post('token')
  async signIn(
    @Res() res,
    @Body(ValidationPipe)
    authCredentials: AuthCredentialsDto,
  ): Promise<void> {
    const token = await this.authService.createToken(authCredentials);
    res.set('Authorization', `Bearer ${token}`);
    res.set('Access-Control-Expose-Headers', 'Authorization');
    res.send();
  }

  @Get('users')
  async getUserCount(): Promise<number> {
    return this.authService.getUserCount();
  }
  send(topicPayload: TopicPayload) {
    this.client.emit<TopicPayload>(topicPayload.topic, topicPayload.payload());
  }
}
