import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Profile } from './profile.entity';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Profile => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
